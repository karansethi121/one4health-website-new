import { useEffect } from 'react';

/**
 * Hook for managing the document title.
 * @param title The title to set for the current page.
 * @param appendSiteName Whether to append " | One4Health™" to the title. Defaults to true.
 */
export function useDocumentTitle(title: string, appendSiteName: boolean = true) {
    useEffect(() => {
        const fullTitle = appendSiteName ? `${title} | One4Health™` : title;
        document.title = fullTitle;
    }, [title, appendSiteName]);
}
