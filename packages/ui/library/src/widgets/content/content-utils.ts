export const uid = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? (crypto as any).randomUUID()
		: Math.random().toString(36).slice(2);
export const save = (k: string, v: any) => {
	try {
		localStorage.setItem(k, JSON.stringify(v));
	} catch {}
};
export const load = <T>(k: string, f: T): T => {
	try {
		const r = localStorage.getItem(k);
		return r ? (JSON.parse(r) as T) : f;
	} catch {
		return f;
	}
};
