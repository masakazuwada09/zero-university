// High-end procedural sound generator using Web Audio API
// Zero external sound file dependencies, instant response, zero latency.

class SoundSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private listeners: Set<(muted: boolean) => void> = new Set();

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public subscribe(fn: (muted: boolean) => void) {
    this.listeners.add(fn);
    fn(this.isMuted);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    
    if (!this.isMuted) {
      this.startAmbient();
      this.playChime(520, "sine", 0.15);
    } else {
      this.stopAmbient();
    }

    this.listeners.forEach((fn) => fn(this.isMuted));
    return this.isMuted;
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted) return;
    this.stopAmbient();

    try {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);
      this.ambientGain.connect(this.ctx.destination);

      // Low peaceful ambient chord: F1 (43.65Hz), C2 (65.41Hz), Ab2 (103.83Hz), Eb3 (155.56Hz)
      const freqs = [43.65, 65.41, 103.83, 155.56];
      freqs.forEach((freq) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Slight subtle detune for warm analog feel
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((Math.random() - 0.5) * 0.6, this.ctx.currentTime);
          osc.connect(panner);
          panner.connect(this.ambientGain);
        } else {
          osc.connect(this.ambientGain);
        }

        osc.start();
        this.ambientOscillators.push(osc);
      });
    } catch {
      // AudioContext could fail on some restricted webviews
    }
  }

  private stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.8);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      this.ambientOscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.ambientOscillators = [];
    }, 850);
  }

  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      const startFreq = 1400 + Math.random() * 200;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // ignore
    }
  }

  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  }

  public playChime(freq = 640, type: OscillatorType = "sine", volume = 0.08) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch {
      // ignore
    }
  }

  public playWarp() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    // Harmonic multi-tier chime
    [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      setTimeout(() => {
        this.playChime(f, "sine", 0.04);
      }, i * 60);
    });
  }
}

export const sound = new SoundSystem();
