'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Square } from 'lucide-react';

const MAX_CHUNK_LENGTH = 900;

function normalizeSpeechText(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[*_`>~-]/g, ' ')
    .replace(/\|/g, '. ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks = [];
  let current = '';

  sentences.forEach((sentence) => {
    const cleanSentence = sentence.trim();
    if (!cleanSentence) return;

    if ((current + ' ' + cleanSentence).trim().length > MAX_CHUNK_LENGTH && current) {
      chunks.push(current.trim());
      current = cleanSentence;
      return;
    }

    current = `${current} ${cleanSentence}`.trim();
  });

  if (current) chunks.push(current.trim());
  return chunks;
}

export default function ArticleAudioPlayer({ title, content }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [status, setStatus] = useState('idle');
  const [chunkIndex, setChunkIndex] = useState(0);
  const [rate, setRate] = useState(0.92);
  const chunksRef = useRef([]);
  const chunkIndexRef = useRef(0);

  const speechText = useMemo(() => {
    return normalizeSpeechText(`${title}. ${content}`);
  }, [content, title]);

  useEffect(() => {
    setHasMounted(true);
    setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  }, []);

  useEffect(() => {
    chunksRef.current = splitIntoChunks(speechText);
    chunkIndexRef.current = 0;
    setChunkIndex(0);

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechText]);

  function speakChunk(index) {
    const chunk = chunksRef.current[index];
    if (!chunk || typeof window === 'undefined') {
      setStatus('idle');
      setChunkIndex(0);
      chunkIndexRef.current = 0;
      return;
    }

    const utterance = new window.SpeechSynthesisUtterance(chunk);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 0.96;

    utterance.onend = () => {
      const nextIndex = chunkIndexRef.current + 1;
      chunkIndexRef.current = nextIndex;
      setChunkIndex(nextIndex);
      speakChunk(nextIndex);
    };

    utterance.onerror = () => {
      setStatus('idle');
    };

    setStatus('playing');
    window.speechSynthesis.speak(utterance);
  }

  function handlePlay() {
    if (!isSupported) return;

    if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('playing');
      return;
    }

    window.speechSynthesis.cancel();
    chunkIndexRef.current = chunkIndex;
    speakChunk(chunkIndex);
  }

  function handlePause() {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }

  function handleStop() {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    chunkIndexRef.current = 0;
    setChunkIndex(0);
    setStatus('idle');
  }

  function handleRestart() {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    chunkIndexRef.current = 0;
    setChunkIndex(0);
    speakChunk(0);
  }

  if (!hasMounted) {
    return null;
  }

  const totalChunks = chunksRef.current.length || 1;
  const progress = Math.min(100, Math.round((chunkIndex / totalChunks) * 100));
  const isPlaying = status === 'playing';
  const isPaused = status === 'paused';

  return (
    <section className="article-audio-player" aria-label="Article audio player">
      <div className="article-audio-copy">
        <span>Listen to this article</span>
        <small>{!isSupported ? 'Audio unavailable' : isPlaying ? 'Playing now' : isPaused ? 'Paused' : 'Ready'}</small>
      </div>

      <div className="article-audio-controls">
        <button type="button" onClick={isPlaying ? handlePause : handlePlay} aria-label={isPlaying ? 'Pause article audio' : 'Play article audio'} disabled={!isSupported}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button type="button" onClick={handleStop} aria-label="Stop article audio" disabled={!isSupported}>
          <Square size={16} />
        </button>
        <button type="button" onClick={handleRestart} aria-label="Restart article audio" disabled={!isSupported}>
          <RotateCcw size={17} />
        </button>
        <label>
          <span>Speed</span>
          <select value={rate} onChange={(event) => setRate(Number(event.target.value))} disabled={!isSupported || isPlaying}>
            <option value={0.8}>0.8x</option>
            <option value={0.92}>0.9x</option>
            <option value={1}>1x</option>
            <option value={1.12}>1.1x</option>
          </select>
        </label>
      </div>

      <div className="article-audio-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
