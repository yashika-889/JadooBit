import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Volume2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [isSummoning, setIsSummoning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const convertToJadooBits = (text: string): string => {
    if (!text.trim()) return '';
    
    const binaryArray: string[] = [];
    
    // Convert input text to binary
    for (let char of text) {
      const asciiCode = char.charCodeAt(0);
      const binaryString = asciiCode.toString(2).padStart(8, '0');
      binaryArray.push(binaryString);
    }
    
    // Add space and then "I am jadoo" in binary
    binaryArray.push('00100000'); // space character
    
    const jadooText = "I am jadoo";
    for (let char of jadooText) {
      const asciiCode = char.charCodeAt(0);
      const binaryString = asciiCode.toString(2).padStart(8, '0');
      binaryArray.push(binaryString);
    }
    
    // Add newline character at the end
    binaryArray.push('00001010');
    
    return binaryArray.join(' ');
  };

  const playConversionSound = () => {
    try {
      // Create a synthesized "conversion" sound effect
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create multiple oscillators for a richer sound
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a digital conversion sound effect
      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      oscillator1.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
      
      oscillator2.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator2.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
      oscillator2.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator1.type = 'square';
      oscillator2.type = 'triangle';
      
      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.5);
      oscillator2.start(audioContext.currentTime + 0.05);
      oscillator2.stop(audioContext.currentTime + 0.45);
      
    } catch (error) {
      console.log("Audio playback not supported");
    }
  };

  const playCompletionSound = () => {
    try {
      // Create a success/completion sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create ascending completion chime
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
      
    } catch (error) {
      console.log("Audio playback not supported");
    }
  };



  const playCustomVoice = async () => {
    try {
      // Check if custom audio file exists
      // Replace 'jadoo-voice.mp3' with your actual audio file name
      const audio = new Audio('/assets/jadoo-voice.mp3');
      
      audio.oncanplay = () => {
        audio.play().catch(error => {
          console.error("Audio playback failed:", error);
          // Fallback to synthesized sound
          playFallbackJadooSound();
        });
      };
      
      audio.onerror = () => {
        console.error("Audio file not found, using fallback sound");
        // Fallback to synthesized sound
        playFallbackJadooSound();
      };
      
      audio.load();
      
    } catch (error) {
      console.error("Custom audio error:", error);
      playFallbackJadooSound();
    }
  };

  const playFallbackJadooSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create alien-like sound effect
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
      oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);

      oscillator.type = 'sine';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.5);
    } catch (error) {
      console.error("Fallback audio error:", error);
    }
  };

  const handleSummon = async () => {
    if (!input.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text or numbers to convert!",
        variant: "destructive",
      });
      return;
    }

    setIsSummoning(true);
    setIsConverting(true);

    // Play conversion sound first
    playConversionSound();
    
    // Play custom voice or fallback sound
    playCustomVoice();

    // Perform conversion with delay for effect
    setTimeout(() => {
      const jadooBits = convertToJadooBits(input);
      setOutput(jadooBits);
      setShowOutput(true);
      setIsConverting(false);
      
      // Play completion sound after conversion is done
      setTimeout(() => {
        playCompletionSound();
      }, 100);
    }, 800);

    toast({
      title: "Jadoo Summoned! 👽",
      description: "The alien magic is converting your text...",
    });

    setTimeout(() => {
      setIsSummoning(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Jadoo bits copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSummoning) {
      handleSummon();
    }
  };

  const outputStats = output ? `${output.split(' ').length} bytes of Jadoo binary data` : "0 bytes converted";

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-blue via-night-purple to-jadoo-dark text-white overflow-x-hidden relative">
      {/* Starry Night Sky Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large twinkling stars */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-star-gold rounded-full animate-twinkle"></div>
        <div className="absolute top-32 right-20 w-1.5 h-1.5 bg-star-silver rounded-full animate-twinkle-fast"></div>
        <div className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-star-gold rounded-full animate-twinkle-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-star-silver rounded-full animate-twinkle"></div>
        <div className="absolute top-1/2 left-1/5 w-1.5 h-1.5 bg-star-gold rounded-full animate-twinkle-fast"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-star-silver rounded-full animate-twinkle-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-1 h-1 bg-star-gold rounded-full animate-twinkle"></div>
        <div className="absolute bottom-32 right-10 w-1.5 h-1.5 bg-star-silver rounded-full animate-twinkle-fast"></div>
        
        {/* Small scattered stars */}
        <div className="absolute top-16 left-1/2 w-0.5 h-0.5 bg-star-silver rounded-full animate-twinkle opacity-70"></div>
        <div className="absolute top-24 left-3/4 w-0.5 h-0.5 bg-star-gold rounded-full animate-twinkle-slow opacity-60"></div>
        <div className="absolute top-40 right-1/2 w-0.5 h-0.5 bg-star-silver rounded-full animate-twinkle-fast opacity-80"></div>
        <div className="absolute top-2/3 left-2/3 w-0.5 h-0.5 bg-star-gold rounded-full animate-twinkle opacity-50"></div>
        <div className="absolute bottom-40 left-1/6 w-0.5 h-0.5 bg-star-silver rounded-full animate-twinkle-slow opacity-70"></div>
        <div className="absolute bottom-24 right-1/5 w-0.5 h-0.5 bg-star-gold rounded-full animate-twinkle-fast opacity-60"></div>
        
        {/* Magical nebula effect */}
        <div className="absolute top-16 left-16 w-32 h-32 bg-jadoo-teal rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-16 right-16 w-24 h-24 bg-jadoo-green rounded-full blur-2xl opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-purple-400 rounded-full blur-xl opacity-10 animate-bounce delay-500"></div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="mb-6 relative">
              <div className="text-6xl mb-2 animate-bounce-slow">👽</div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-jadoo-teal rounded-full animate-ping"></div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-jadoo-teal to-jadoo-green bg-clip-text text-transparent">
              Jadoo Bit Converter
            </h1>
            
            <p className="text-slate-300 text-lg">
              Enter any text or number to see the magic!
            </p>
          </div>

          {/* Converter Form */}
          <Card className="bg-night-blue/60 backdrop-blur-sm border-purple-500/30 mb-6 shadow-2xl shadow-purple-500/10">
            <CardContent className="p-6">
              <div className="mb-6">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type anything. Jadoo won't care 😊"
                  className="bg-night-blue/80 border-purple-400/50 text-star-gold placeholder-purple-200/70 focus:ring-jadoo-teal focus:border-jadoo-teal focus:text-star-gold"
                  data-testid="input-converter"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSummon}
                  disabled={isSummoning}
                  className="w-full bg-jadoo-green hover:bg-green-400 text-slate-900 font-semibold shadow-lg hover:shadow-jadoo-green/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  data-testid="button-summon"
                >
                  {isSummoning ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-slate-900/20 border-t-slate-900 rounded-full mr-2"></div>
                      Converting & Summoning...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      <Wand2 className="w-4 h-4 mr-2" />
                      Summon Jadoo
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Display */}
          {showOutput && (
            <Card className="bg-night-purple/40 backdrop-blur-sm border-purple-400/40 animate-slideUp shadow-2xl shadow-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-jadoo-teal flex items-center">
                  <span className="mr-2">💻</span>
                  Jadoo Bits Output
                </h3>
                <div className="bg-black/40 rounded-xl p-4 font-mono text-sm leading-relaxed min-h-20 max-h-60 overflow-y-auto scrollbar-custom border border-purple-400/20">
                  <pre className="text-star-gold whitespace-pre-wrap" data-testid="text-output">
                    {output || "Your magical bits will appear here..."}
                  </pre>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-purple-200/70" data-testid="text-stats">
                    {outputStats}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="text-star-gold hover:text-star-silver hover:bg-night-purple/50"
                    data-testid="button-copy"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 text-center text-slate-500 text-sm">
          © 2025 Jadoo Bit Converter • Made with 👽 magic
        </div>
      </div>
    </div>
  );
}
