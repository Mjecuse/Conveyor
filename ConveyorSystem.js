import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ConveyorSystem() {
  const [cb1Speed, setCb1Speed] = useState(1);
  const [cb2Speed, setCb2Speed] = useState(1);
  const [stack, setStack] = useState([]);
  const [removalMethod, setRemovalMethod] = useState("top");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => [...prev, prev.length + 1]);
    }, 1000 / cb1Speed);
    return () => clearInterval(interval);
  }, [cb1Speed]);

  useEffect(() => {
    if (stack.length === 0) return;
    const interval = setInterval(() => {
      setStack((prev) => 
        removalMethod === "top" ? prev.slice(0, -1) : prev.slice(1)
      );
    }, 1000 / cb2Speed);
    return () => clearInterval(interval);
  }, [cb2Speed, stack.length, removalMethod]);

  return (
    <div className="p-5 space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h2>Conveyor Belt 1 (CB1)</h2>
          <p>Speed: {cb1Speed} boxes/sec</p>
          <div className="space-x-2">
            {[1, 2, 3, 4, 5].map((speed) => (
              <Button key={speed} onClick={() => setCb1Speed(speed)}>
                {speed}x
              </Button>
            ))}
          </div>
        </div>
        <motion.div
          className="bg-blue-500 w-10 h-10"
          animate={{ x: [0, 300], opacity: [1, 1, 0] }}
          transition={{ duration: 1 / cb1Speed, repeat: Infinity }}
        />
        <div>
          <h2>Stack</h2>
          <p>Count: {stack.length}</p>
          <div className="bg-gray-300 p-2 min-h-40 w-20 flex flex-col items-center">
            {stack.map((box) => (
              <div key={box} className="bg-red-500 w-10 h-10 m-1" />
            ))}
          </div>
        </div>
        <motion.div
          className="bg-green-500 w-10 h-10"
          animate={{ x: [300, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 1 / cb2Speed, repeat: Infinity }}
        />
        <div>
          <h2>Conveyor Belt 2 (CB2)</h2>
          <p>Speed: {cb2Speed} boxes/sec</p>
          <div className="space-x-2">
            {[1, 2, 3, 4, 5].map((speed) => (
              <Button key={speed} onClick={() => setCb2Speed(speed)}>
                {speed}x
              </Button>
            ))}
          </div>
          <div className="space-x-2 mt-2">
            <Button onClick={() => setRemovalMethod("top")}>Remove Top</Button>
            <Button onClick={() => setRemovalMethod("bottom")}>Remove Bottom</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
