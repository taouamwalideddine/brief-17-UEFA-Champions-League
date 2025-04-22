import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the matches page
  redirect('/matches');
}
