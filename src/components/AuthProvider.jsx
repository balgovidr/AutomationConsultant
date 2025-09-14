"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [session, setSession] = useState(null);
	const [loading, setLoading] = useState(true);

	const signOut = async () => {
		await supabase.auth.signOut();
		window.location.href = "/auth/login";
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	useEffect(() => {
		// Check if session exists before making API call
		if (!session) return;

		fetch("/api/check-auth", {
			headers: {
				"sb-client-user-id": session?.user?.id || ""
			}
		}).then((res) => {
			if (res.status === 403) {
				// Access forbidden, because the user is not signed in on the server so force sign out
				supabase.auth.signOut();
				window.location.href = "/auth/login";
			}
		});
	}, [session]);

	return (
		<AuthContext.Provider value={{ session, supabase, signOut, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
