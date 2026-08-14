"use client";

import { useCallback, useEffect, useState, type DependencyList } from "react";

interface AsyncDataState<T> {
    data: T | undefined;
    loading: boolean;
    error: string | null;
    reload: () => void;
}

/** Runs `fetcher` whenever `deps` change (and on demand via `reload`), tracking loading/error state. */
export function useAsyncData<T>(
    fetcher: () => Promise<T>,
    deps: DependencyList,
    errorMessage = "Failed to load data"
): AsyncDataState<T> {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [reloadIndex, setReloadIndex] = useState(0);

    useEffect(() => {
        let isActive = true;
        setLoading(true);
        setError(null);

        fetcher()
            .then((result) => {
                if (isActive) setData(result);
            })
            .catch(() => {
                if (isActive) setError(errorMessage);
            })
            .finally(() => {
                if (isActive) setLoading(false);
            });

        return () => {
            isActive = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, reloadIndex]);

    const reload = useCallback(() => setReloadIndex((i) => i + 1), []);

    return { data, loading, error, reload };
}
