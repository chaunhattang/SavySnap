/** @format */
"use client";

import { Select } from "antd";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const HeaderComponent = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const handleLanguageChange = (value: string) => {
		document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000; SameSite=Lax`;
		const newPath = pathname.replace(`/${locale}`, `/${value}`);
		router.push(newPath || "/");
		router.refresh();
	};

	return (
		<nav className='navbar navbar-expand-lg p-2 navbar-light bg-white fixed-top d-flex justify-content-between'>
			<a className='navbar-brand text-muted font-weight-bold' href='#'>
				Header
			</a>
			<Select
				value={locale}
				style={{ width: 120 }}
				onChange={handleLanguageChange}
				options={[
					{ value: "vi", label: "Tiếng Việt" },
					{ value: "en", label: "English" },
				]}
			/>
		</nav>
	);
};

export default HeaderComponent;
