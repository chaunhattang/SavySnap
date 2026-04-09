import { defaultLocale } from '@/locales';
import { redirect } from 'next/navigation';

export default function RootPage() {
    redirect(`/${defaultLocale}`);
}
