import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return {
		title: 'Stock Exchange Dashboard'
	};
};
