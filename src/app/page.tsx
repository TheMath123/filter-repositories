"use client";

import { useEffect, useState } from "react";

interface Repo {
  name: string;
  description: string;
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/themath123/repos")
      .then((respose) => respose.json())
      .then((data) => setRepos(data));
  }, []);

  const filteredRepos =
    search.length > 0
      ? repos.filter((repo) => repo.name.includes(search))
      : repos;

  return (
    <main>
      <input
        className="text-black"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredRepos.map((repo) => {
          return <li key={repo.name}>{repo.name}</li>;
        })}
      </ul>
    </main>
  );
}
