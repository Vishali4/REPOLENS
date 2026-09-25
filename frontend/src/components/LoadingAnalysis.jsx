import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Circle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useRepository } from '../context/RepositoryContext';

const steps = [
  'Connecting to GitHub API',
  'Fetching repository metadata',
  'Scanning files and directory tree',
  'Detecting languages and metrics',
  'Preparing architectural insights',
];

export default function LoadingAnalysis({ repoUrl, onFinish, onErrorDismiss }) {
  const navigate = useNavigate();
  const { analyzeRepository } = useRepository();
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let stepTimer;

    // Gradual step progress while request is ongoing
    const advanceSteps = () => {
      stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 2) {
            return prev + 1;
          }
          return prev;
        });
      }, 450);
    };

    advanceSteps();

    // Trigger real backend analysis
    const executeAnalysis = async () => {
      const result = await analyzeRepository(repoUrl);

      if (!isMounted) return;
      clearInterval(stepTimer);

      if (result.success) {
        // Fast-forward to final step
        setCurrentStep(steps.length - 1);
        setTimeout(() => {
          if (onFinish) {
            onFinish();
          } else {
            navigate('/dashboard');
          }
        }, 500);
      } else {
        setErrorMessage(result.error || 'Failed to analyze repository.');
      }
    };

    executeAnalysis();

    return () => {
      isMounted = false;
      clearInterval(stepTimer);
    };
  }, [repoUrl, analyzeRepository, navigate, onFinish]);

  const progressPercent = errorMessage
    ? 0
    : Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-background-main/95 backdrop-blur-md flex flex-col items-center justify-center p-6 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-purple-primary/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-card-main border border-border-subtle rounded-3xl p-8 shadow-glow-lg text-center">
        {/* Animated Brand Radar or Error Icon */}
        <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center relative mb-6 shadow-glow-md ${
          errorMessage
            ? 'bg-status-error/15 border border-status-error/40 text-status-error'
            : 'bg-purple-primary/10 border border-purple-primary/30 text-purple-bright'
        }`}>
          {errorMessage ? (
            <AlertTriangle className="w-10 h-10 text-status-error" />
          ) : (
            <>
              <div className="absolute inset-0 rounded-2xl border border-purple-bright/40 animate-ping opacity-25" />
              <Loader2 className="w-10 h-10 text-purple-bright animate-spin" />
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-text-main tracking-tight">
          {errorMessage ? 'Analysis Failed' : 'Analyzing Repository'}
        </h2>
        <p className="mt-1 text-xs text-text-muted font-mono truncate px-4">
          {repoUrl || 'https://github.com/pallets/flask'}
        </p>

        {/* Error View */}
        {errorMessage ? (
          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-xl bg-status-error/10 border border-status-error/20 text-xs text-status-error text-left">
              <p className="font-bold">Error:</p>
              <p className="mt-1 leading-relaxed">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onErrorDismiss) {
                  onErrorDismiss();
                } else {
                  navigate('/');
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-white bg-card-hover border border-border-subtle hover:border-purple-bright transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Try Another Repository</span>
            </button>
          </div>
        ) : (
          <>
            {/* Linear Progress Bar */}
            <div className="mt-6 w-full h-2 rounded-full bg-background-main border border-border-subtle overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-primary via-purple-bright to-purple-light transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[11px] font-mono text-text-muted">
              <span>Scanning repository AST &amp; tree</span>
              <span className="text-purple-light font-bold">{progressPercent}%</span>
            </div>

            {/* Steps Checklist */}
            <div className="mt-6 pt-5 border-t border-border-subtle space-y-3 text-left">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 text-xs transition-colors ${
                      isCompleted
                        ? 'text-status-success font-medium'
                        : isCurrent
                        ? 'text-purple-bright font-bold'
                        : 'text-text-muted opacity-50'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-purple-bright animate-spin flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-text-muted flex-shrink-0" />
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
