import React, { useState, useEffect } from 'react';
import { aiServiceUrl } from '../services/aiApi';

const ReasoningTimeline = ({ userId = 'demo' }) => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setSteps([]);
    const fetchReasoning = async () => {
      try {
        const response = await fetch(`${aiServiceUrl}/api/agents/reasoning/${encodeURIComponent(userId)}`, { signal: controller.signal });
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        if (!controller.signal.aborted) setSteps(Array.isArray(data) ? data.filter(step => typeof step === 'string') : []);
      } catch (_err) {
        if (!controller.signal.aborted) setSteps([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    
    fetchReasoning();
    return () => controller.abort();
  }, [userId]);

  return (
    <section className="py-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-3xl w-full px-6">
        <h2 className="text-3xl md:text-5xl font-semibold mb-12 text-center text-gray-900 tracking-tight">Eligibility Workflow</h2>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
          {loading ? (
            <p className="text-gray-500 animate-pulse text-center">Engine thinking...</p>
          ) : steps.length === 0 ? (
            <p className="text-gray-500 text-center">Workflow steps are unavailable right now.</p>
          ) : (
            <div className="relative border-l-2 border-blue-200 ml-4">
              {steps.map((step, index) => (
                <div key={index} className="mb-10 ml-8 relative group">
                  <span className="absolute -left-12 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 ring-4 ring-white font-semibold transition-all group-hover:bg-blue-600 group-hover:text-white">
                    {index + 1}
                  </span>
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-gray-900 tracking-tight">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReasoningTimeline;
