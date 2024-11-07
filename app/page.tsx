"use client";
import Clients from "./components/clients";
import CustomersList from "./munkaink/customers-list";
import Hero from "./components/UI/Hero";
import dynamic from "next/dynamic";

const FaceMesh = dynamic(() => import("./components/faceMesh"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Clients />
      <CustomersList />
      <FaceMesh />
    </main>
  );
}
