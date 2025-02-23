"use client"; 

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function ExampleCard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; 

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Hello, ShadCN UI!</h2>
      </CardContent>
    </Card>
  );
}
