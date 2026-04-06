"use server"

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export interface LeaderboardEntry {
  id: string;
  name: string;
  wpm: number;
}

export async function getLeaderboard() {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('id, name, wpm')
    .order('wpm', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }

  return data as LeaderboardEntry[];
}

export async function submitScore(name: string, wpm: number) {
  if (!name || name.trim() === '') return { success: false, message: 'Name is required' };

  // Fetch current top scores
  const { data: topScores, error: fetchError } = await supabase
    .from('leaderboard')
    .select('id, wpm')
    .order('wpm', { ascending: false });

  if (fetchError) {
    return { success: false, message: 'Error fetching board' };
  }

  // If the board is full (10 or more), check if the new score qualifies
  if (topScores && topScores.length >= 10) {
    const tenthPlaceWpm = topScores[9].wpm;
    if (wpm <= tenthPlaceWpm) {
      return { 
        success: false, 
        message: "Failed! You are not the top 10 mallu speed typer. Try again!" 
      };
    }
  }

  // Insert the new score
  const { error: insertError } = await supabase
    .from('leaderboard')
    .insert([{ name, wpm }]);

  if (insertError) {
    return { success: false, message: 'Error saving score' };
  }

  // Fetch the new list of IDs after insertion
  const { data: newTopScores } = await supabase
    .from('leaderboard')
    .select('id')
    .order('wpm', { ascending: false })
    .limit(10);

  if (newTopScores && newTopScores.length > 0) {
    const top10Ids = newTopScores.map(score => score.id);
    
    // Delete any entry that's NOT in the top 10 IDs
    await supabase
      .from('leaderboard')
      .delete()
      .not('id', 'in', `(${top10Ids.join(',')})`);
  }

  revalidatePath('/');
  return { success: true, message: 'Welcome to the Top 10!' };
}
