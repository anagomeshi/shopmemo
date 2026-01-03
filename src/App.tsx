import { useState } from "react";
import type { Bookmark } from "./type";
import { Cmdpal } from "./components/cmdpal/cmdpal";
import "@vscode/codicons/dist/codicon.css";

export function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
  const [newBookmarkURL, setNewBookmarkURL] = useState("");
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  const handleAddPanelOpen = () => {
    setIsAddPanelOpen(!isAddPanelOpen);
  }

  const handleAddNewBookmark = () => {
    const newBookmark: Bookmark = { id: newBookmarkTitle, title: newBookmarkTitle, url: newBookmarkURL };
    setBookmarks([...bookmarks, newBookmark]);
    setNewBookmarkTitle("");
    setNewBookmarkURL("");
    handleAddPanelOpen();
  }

  return (
    <>
      <div className={`add-panel-wrapper ${isAddPanelOpen ? "active" : ""}`}>
        <div className="add-panel">
          <div className="add-panel-header">
            <h3>ブックマークを追加</h3>
            <button
              className="codicon codicon-close"
              onClick={handleAddPanelOpen}
              title="閉じる" />
          </div>
          <div className="add-panel-content">
            <section>
              <span>ブックマークのタイトル</span>
              <input
                spellCheck="false"
                value={newBookmarkTitle}
                onChange={(e) => setNewBookmarkTitle(e.target.value)}
                placeholder="ブックマークのタイトルを入力" />
            </section>
            <section>
              <span>ブックマークのURL</span>
              <input
                spellCheck="false"
                value={newBookmarkURL}
                onChange={(e) => setNewBookmarkURL(e.target.value)}
                placeholder="ブックマークのURLを入力" />
            </section>
            <div className="add-panel-button-area">
              <button onClick={handleAddNewBookmark}>追加</button>
            </div>
          </div>
        </div>
      </div>
      <div className="app-header">
        <button
          className="codicon codicon-add"
          onClick={handleAddPanelOpen}
          title="ブックマークを追加" />
      </div>
      <div className="top-spacing" />
      <Cmdpal bookmarks={bookmarks} />
    </>
  )
}