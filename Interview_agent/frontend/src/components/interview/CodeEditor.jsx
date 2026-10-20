import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FiTerminal, FiX, FiCheck, FiCode } from 'react-icons/fi'
import Editor from '@monaco-editor/react'
import { Button } from '../ui/Button'

const LANG_OPTIONS = ['javascript', 'python', 'java', 'cpp']

const DEFAULT_CODE = {
  javascript: `// Write your solution here
function solution() {
  // your code
}`,
  python: `# Write your solution here
def solution():
    pass`,
  java: `// Write your solution here
public class Solution {
    public static void main(String[] args) {
        // your code
    }
}`,
  cpp: `// Write your solution here
#include <iostream>
using namespace std;

int main() {
    // your code
    return 0;
}`,
}

export function CodeEditor({ onClose, onSubmitCode }) {
  const [lang, setLang] = useState('javascript')
  const [code, setCode] = useState(DEFAULT_CODE['javascript'])

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden rounded-3xl bg-[#0B1220]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_30px_rgba(103,232,249,0.12)] z-10"
        >
          {/* Top Specular Rim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

          {/* Header Bar */}
          <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-black/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <FiTerminal size={16} />
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold text-white tracking-tight">
                  Code Execution Terminal
                </h3>
                <p className="font-mono text-[10px] text-slate-400">Monaco Engine ES2024</p>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#070B14] border border-white/10">
              {LANG_OPTIONS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLang(l)
                    setCode(DEFAULT_CODE[l])
                  }}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                    lang === l
                      ? 'bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-200 border border-cyan-400/35 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Editor"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Monaco Editor Surface */}
          <div className="relative flex-1 min-h-0 bg-[#070B14]">
            <Editor
              height="100%"
              language={lang}
              value={code}
              onChange={(v) => setCode(v || '')}
              theme="vs-dark"
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 14, bottom: 14 },
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontLigatures: true,
                renderLineHighlight: 'line',
                cursorBlinking: 'smooth',
                tabSize: 2,
              }}
            />
          </div>

          {/* Footer Bar with Action */}
          <div className="relative border-t border-white/[0.08] px-5 py-3.5 bg-black/40 flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
              <FiCode className="text-cyan-400" />
              Code block will be appended to your answer transcript.
            </span>
            <div className="flex items-center gap-2.5">
              <Button variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onSubmitCode?.(code)}
                icon={FiCheck}
              >
                Insert Code into Answer
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default CodeEditor
