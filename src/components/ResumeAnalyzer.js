import React, { useState, useEffect, useRef } from 'react';

const ResumeAnalyzer = ({ candidateId }) => {
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const eventSourceRef = useRef(null);

  const startAnalysis = () => {
    if (!candidateId) {
      setError('Please provide a candidate ID');
      return;
    }

    setStatus('loading');
    setError('');
    setResult('');

    const url = `/api/v1/llm/analyze-resume/?candidate_id=${candidateId}`;
    
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.result) {
        setStatus('completed');
        setResult(data.result);
      } else if (data.error) {
        setStatus('error');
        setError(data.error);
      }
    };

    eventSourceRef.current.onerror = () => {
      setStatus('error');
      setError('Connection error occurred');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const getStatusMessage = () => {
    switch (status) {
      case 'idle':
        return 'Click to analyze resume';
      case 'loading':
        return 'Analyzing resume...';
      case 'completed':
        return 'Analysis complete!';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  return (
    <div className="resume-analyzer">
      <div className="status-indicator">
        <div className={`status-dot ${status}`} />
        <span>{getStatusMessage()}</span>
      </div>

      {status === 'completed' && (
        <div className="analysis-result">
          <h3>Resume Summary:</h3>
          <p>{result}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={startAnalysis}
        disabled={status === 'loading' || status === 'completed'}
      >
        {status === 'loading' ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      <style jsx>{`
        .resume-analyzer {
          padding: 20px;
          border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 0 auto;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .status-dot.idle {
          background: #ccc;
        }

        .status-dot.loading {
          background: #2196F3;
          animation: pulse 1.5s infinite;
        }

        .status-dot.completed {
          background: #4CAF50;
        }

        .status-dot.error {
          background: #F44336;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .analysis-result {
          margin: 20px 0;
          padding: 20px;
          border-radius: 4px;
          background: #f8f9fa;
        }

        .analysis-result h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .analysis-result p {
          margin: 0;
          color: #666;
        }

        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }

        button {
          background: #2196F3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        button:hover {
          background: #1976D2;
        }

        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ResumeAnalyzer;
