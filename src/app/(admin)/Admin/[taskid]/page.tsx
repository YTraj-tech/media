'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface ITask {
  _id: string;
  clientId: string;
  workerId: string[];
  vehicalType: string;
  startDate: Date;
  numberOfWorker: number;
  stopit: boolean;
  iscompleted: boolean;
  review: string;
}

const SingleTask = () => {
  const params = useParams();
  const taskid = params.taskid as string;
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!taskid) {
      setError("No task ID provided");
      setLoading(false);
      return;
    }

    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/task/${taskid}`, {
          credentials: "include",
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || `Error: ${response.status}`);

        setTask(data.SingelTask);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskid]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading task...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (!task) return <div className="flex justify-center items-center min-h-screen">Task not found</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold">Task Details</h1>

        <div><strong>Client ID:</strong> {task.clientId}</div>
        {/* <div><strong>Worker IDs:</strong> {task.workerId.join(', ') || 'None assigned'}</div> */}
        <div><strong>Vehicle Type:</strong> {task.vehicalType}</div>
        <div><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</div>
        <div><strong>Number of Workers:</strong> {task.numberOfWorker}</div>
        <div><strong>Stopped:</strong> {task.stopit ? 'Yes' : 'No'}</div>
        <div><strong>Completed:</strong> {task.iscompleted ? 'Yes' : 'No'}</div>
        <div><strong>Review:</strong> {task.review || 'No review yet'}</div>
        <div>{task.workerId.length!==task.numberOfWorker ? "Wprkers Are required" : "workers full filled"}</div>
      </div>
    </div>
  );
};

export default SingleTask;