import { useState, useRef, useEffect, useCallback } from 'react';
import { Pollinations } from '@/lib/pollinations';
import { SCIENTIFIC_RESTORATION_REPORT_PROMPT, FLUX_PROMPT } from '@/lib/constants';

export type ChronosState = 'IDLE' | 'SCANNING' | 'RECONSTRUCTING' | 'COMPLETE' | 'ERROR';
export type EnhanceStatus = 'IDLE' | 'SEARCHING' | 'SUCCESS' | 'FAILED';

export interface HistoryEntry {
  id: string;
  timestamp: number;
  sourceImageUrl: string;
  lore: string;
  imageUrl: string;
  videoUrl: string | null;
}

const HISTORY_STORAGE_KEY = 'chronos_history';
const MAX_HISTORY_ENTRIES = 20;

const loadHistory = (): HistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const persistHistory = (entries: HistoryEntry[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_HISTORY_ENTRIES)));
  } catch {}
};

export const useChronos = () => {
  const [state, setState] = useState<ChronosState>('IDLE');
  const [enhanceStatus, setEnhanceStatus] = useState<EnhanceStatus>('IDLE');
  const [lore, setLore] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [chronoPaths, setChronoPaths] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const [sourceImageUrl, setSourceImageUrl] = useState<string>('');
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentEntryIdRef = useRef<string>('');
  const videoAbortRef = useRef<AbortController | null>(null);
  const videoBlobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, []);

  const reconstruct = async (url: string, apiKey: string) => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);

    setState('SCANNING');
    setError(null);
    setVideoUrl(null);
    setImageUrl(null);
    setLore('');
    setEnhanceStatus('IDLE');
    setSourceImageUrl(url);

    const pollinations = new Pollinations(apiKey);

    try {
      setState('RECONSTRUCTING');

      const visionResponse = await pollinations.dispatch(SCIENTIFIC_RESTORATION_REPORT_PROMPT, {
        task: 'text',
        image: url,
      });

      const cleanLore = visionResponse.output
        .replace(/```[a-z]*\n?|```/g, '')
        .replace(/[{}\[\]]/g, '')
        .trim();

      if (!cleanLore) throw new Error('Timeline analysis failed.');

      setLore(cleanLore);
      setChronoPaths([
        '[STABILIZE] Archive this timeline.',
        '[REDACT] Classify as Anomaly.',
        '[DIVERGE] Explore Variance.',
      ]);

      const fluxResponse = await pollinations.dispatch(FLUX_PROMPT(cleanLore), { task: 'image' });

      if (!fluxResponse.output) throw new Error('Image reconstruction failed.');

      setImageUrl(fluxResponse.output);

      const entryId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      currentEntryIdRef.current = entryId;

      const entry: HistoryEntry = {
        id: entryId,
        timestamp: Date.now(),
        sourceImageUrl: url,
        lore: cleanLore,
        imageUrl: fluxResponse.output,
        videoUrl: null,
      };

      setHistory(prev => {
        const updated = [entry, ...prev].slice(0, MAX_HISTORY_ENTRIES);
        persistHistory(updated);
        return updated;
      });

      completeTimerRef.current = setTimeout(() => {
        setState('COMPLETE');
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Temporal anomaly detected.');
      setState('ERROR');
    }
  };

  const enhance = async (apiKey: string) => {
    if (!imageUrl) return;

    if (videoAbortRef.current) videoAbortRef.current.abort();
    videoAbortRef.current = new AbortController();

    if (videoBlobUrlRef.current) {
      URL.revokeObjectURL(videoBlobUrlRef.current);
      videoBlobUrlRef.current = null;
    }

    setEnhanceStatus('SEARCHING');
    const pollinations = new Pollinations(apiKey);

    try {
      const videoResponse = await pollinations.dispatch(
        'Cinematic temporal animation slow movement historical restoration high definition museum quality',
        { task: 'video', image: imageUrl }
      );

      if (!videoResponse.output) throw new Error('No corridor detected');

      const fetchRes = await fetch(videoResponse.output, {
        signal: videoAbortRef.current.signal,
      });

      if (!fetchRes.ok) throw new Error('Corridor collapsed');

      const blob = await fetchRes.blob();
      const blobUrl = URL.createObjectURL(blob);
      videoBlobUrlRef.current = blobUrl;

      setVideoUrl(blobUrl);
      setEnhanceStatus('SUCCESS');

      const entryId = currentEntryIdRef.current;
      setHistory(prev => {
        const updated = prev.map(e =>
          e.id === entryId ? { ...e, videoUrl: videoResponse.output } : e
        );
        persistHistory(updated);
        return updated;
      });
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setEnhanceStatus('FAILED');
    }
  };

  const exportCapsule = async () => {
    if (!lore || !imageUrl) return;
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lore, imageUrl, videoUrl }),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `chronos-capsule-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Export Error:', err);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    persistHistory([]);
  };

  const reset = () => {
    if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    if (videoAbortRef.current) videoAbortRef.current.abort();
    if (videoBlobUrlRef.current) {
      URL.revokeObjectURL(videoBlobUrlRef.current);
      videoBlobUrlRef.current = null;
    }
    setState('IDLE');
    setEnhanceStatus('IDLE');
    setLore('');
    setImageUrl(null);
    setVideoUrl(null);
    setChronoPaths([]);
    setError(null);
    setSourceImageUrl('');
  };

  return {
    state,
    enhanceStatus,
    lore,
    imageUrl,
    videoUrl,
    chronoPaths,
    error,
    history,
    sourceImageUrl,
    reconstruct,
    enhance,
    exportCapsule,
    clearHistory,
    reset,
  };
};

