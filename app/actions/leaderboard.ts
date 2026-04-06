"use server"

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import Filter from 'bad-words';

export interface LeaderboardEntry {
  id: string;
  name: string;
  wpm: number;
}

const MAX_LEADERBOARD_SIZE = 10;
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 15;
const MAX_ALLOWED_WPM = 140;
const profanityFilter = new Filter();

type LeaderboardRow = {
  id: string;
  name: string;
  wpm: number;
};

function sanitizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ');
}

function normalizeName(name: string) {
  return sanitizeName(name).toLowerCase();
}

function isValidName(name: string) {
  // Single-name usernames only: letters/numbers/_/- (supports unicode letters)
  return /^[\p{L}\p{N}_-]+$/u.test(name);
}

function containsProfanity(name: string) {
  const probe = name.replace(/[_-]+/g, ' ');
  return profanityFilter.isProfane(probe);
}

function getUniqueTopEntries(rows: LeaderboardRow[]) {
  const seenNames = new Set<string>();
  const topEntries: LeaderboardRow[] = [];
  const keepIds = new Set<string>();

  for (const row of rows) {
    const normalized = normalizeName(row.name);
    if (seenNames.has(normalized)) continue;

    seenNames.add(normalized);
    topEntries.push(row);
    keepIds.add(row.id);

    if (topEntries.length === MAX_LEADERBOARD_SIZE) break;
  }

  return { topEntries, keepIds };
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('id, name, wpm')
    .order('wpm', { ascending: false })
    .limit(200);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  const rows = (data ?? []) as LeaderboardRow[];
  const { topEntries } = getUniqueTopEntries(rows);

  return topEntries.map((entry) => ({
    id: entry.id,
    name: sanitizeName(entry.name),
    wpm: entry.wpm,
  }));
}

export async function submitScore(name: string, wpm: number) {
  const cleanedName = sanitizeName(name);
  const normalizedName = normalizeName(cleanedName);
  const roundedWpm = Math.round(wpm);

  if (!cleanedName) return { success: false, message: 'Name is required' };
  if (cleanedName.length < MIN_NAME_LENGTH || cleanedName.length > MAX_NAME_LENGTH) {
    return { success: false, message: `Name must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} characters` };
  }
  if (!isValidName(cleanedName)) {
    return { success: false, message: 'Use one name only (letters/numbers/_/-, no spaces)' };
  }
  if (containsProfanity(cleanedName)) {
    return { success: false, message: 'Please choose a respectful name' };
  }
  if (!Number.isFinite(roundedWpm) || roundedWpm <= 0) {
    return { success: false, message: 'Invalid score' };
  }
  if (roundedWpm > MAX_ALLOWED_WPM) {
    return { success: false, message: `Score rejected: max allowed is ${MAX_ALLOWED_WPM} WPM` };
  }

  const { data: allScores, error: fetchError } = await supabase
    .from('leaderboard')
    .select('id, name, wpm')
    .order('wpm', { ascending: false });

  if (fetchError) {
    return { success: false, message: 'Error fetching board' };
  }

  const rows = (allScores ?? []) as LeaderboardRow[];
  const existingForName = rows.filter((row) => normalizeName(row.name) === normalizedName);
  const currentBestForName = existingForName[0];
  const { topEntries: uniqueTop } = getUniqueTopEntries(rows);

  if (currentBestForName && roundedWpm <= currentBestForName.wpm) {
    return {
      success: false,
      message: `Only your best score is kept. Your current best is ${currentBestForName.wpm} WPM.`,
    };
  }

  const cutoffWpm = uniqueTop[MAX_LEADERBOARD_SIZE - 1]?.wpm;
  if (!currentBestForName && uniqueTop.length >= MAX_LEADERBOARD_SIZE && cutoffWpm !== undefined && roundedWpm <= cutoffWpm) {
    return {
      success: false,
      message: 'Great effort. Keep practicing and you can break into the Top 10 soon!',
    };
  }

  if (currentBestForName) {
    const { error: updateError } = await supabase
      .from('leaderboard')
      .update({ name: cleanedName, wpm: roundedWpm })
      .eq('id', currentBestForName.id);

    if (updateError) {
      return { success: false, message: 'Error saving score' };
    }

    const duplicateIds = existingForName
      .slice(1)
      .map((entry) => entry.id);

    if (duplicateIds.length > 0) {
      await supabase
        .from('leaderboard')
        .delete()
        .in('id', duplicateIds);
    }
  } else {
    const { error: insertError } = await supabase
      .from('leaderboard')
      .insert([{ name: cleanedName, wpm: roundedWpm }]);

    if (insertError) {
      return { success: false, message: 'Error saving score' };
    }
  }

  const { data: refreshedData, error: refreshError } = await supabase
    .from('leaderboard')
    .select('id, name, wpm')
    .order('wpm', { ascending: false });

  if (refreshError) {
    return { success: false, message: 'Score saved, but cleanup failed' };
  }

  const refreshedRows = (refreshedData ?? []) as LeaderboardRow[];
  const { keepIds } = getUniqueTopEntries(refreshedRows);
  const staleIds = refreshedRows
    .filter((row) => !keepIds.has(row.id))
    .map((row) => row.id);

  if (staleIds.length > 0) {
    await supabase
      .from('leaderboard')
      .delete()
      .in('id', staleIds);
  }

  revalidatePath('/');
  return { success: true, message: 'Score verified and added to the Top 10!' };
}
