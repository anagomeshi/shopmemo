import { useState, useEffect } from "react";
import type { Bookmark } from "../../type";
import "./cmdpal.css";

type CmdpalProps = {
    bookmarks: Bookmark[];
}

export function Cmdpal({ bookmarks }: CmdpalProps){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Bookmark[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const q = query.toLowerCase();
        const filtered = bookmarks.filter(b =>
            b.title.toLowerCase().includes(q)
        );

        setResults(filtered.slice(0, 5));
    }, [query, bookmarks]);

    useEffect(() => {
        setActiveIndex(0);
    }, [results]);

    const handlePageOpen = () => {
        if (results[activeIndex]) window.open(results[activeIndex].url, "_blank");
    }

    return(
        <div className="cmdpal">
            <div className="cmdpal-header">
                <input
                    autoFocus
                    spellCheck="false"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key == "ArrowDown"){
                            e.preventDefault();
                            setActiveIndex(i =>
                                Math.min(i + 1, results.length - 1)
                            );
                        }

                        if(e.key == "ArrowUp"){
                            e.preventDefault();
                            setActiveIndex(i =>
                                Math.max(i - 1, 0)
                            );
                        }

                        if(e.key == "Enter"){
                            e.preventDefault();
                            handlePageOpen();
                        }
                    }}
                    placeholder="ブックマークを検索" />
                <button
                    className="codicon codicon-arrow-up"
                    onClick={handlePageOpen}
                    title="ページを開く" />
            </div>
            {results.length > 0 &&
                <div className="results-box">
                    {results.map((b, i) => (
                        <div
                            key={b.id}
                            className={`results-item ${i == activeIndex ? "active" : ""}`}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => window.open(b.url, "_blank")}>
                            <span className="results-item-title">{b.title}</span>
                            <span className="results-item-url">{b.url}</span>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}