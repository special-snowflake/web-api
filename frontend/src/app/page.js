'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error('Error fetching jobs:', err));
  }, []);

  const addJob = async () => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description })
    });
    const newJob = await res.json();
    setJobs((prev) => [...prev, newJob]);
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Job List</h1>
      <ul>
        {jobs?.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong>: {job.description}
          </li>
        ))}
      </ul>
      <h2>Add a Job</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addJob}>Add Job</button>
    </div>
  );
}
