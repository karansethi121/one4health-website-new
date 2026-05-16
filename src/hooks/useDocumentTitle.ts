import { useLayoutEffect } from 'react';

/**
 * Hook for managing the document title.
 * Uses useLayoutEffect for synchronous updates to ensure title is set before browser paint.
 * @param title The title to set for the current page.
 * @param appendSiteName Whether to append " | One4Health™" to the title. Defaults to true.
 */
export function useDocumentTitle(title: string, appendSiteName: boolean = true) {
    useLayoutEffect(() => {
        const fullTitle = appendSiteName ? `${title} | One4Health™` : title;
        document.title = fullTitle;
    }, [title, appendSiteName]);
}
