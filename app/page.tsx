"use client"
import Clients from "./components/clients";
import CustomersList from './munkaink/customers-list'
import Hero from "./components/UI/Hero";
import FaceMesh from "./components/faceMesh";
export default function Home() {
  console.log('faceMesh',faceMesh)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Clients />
      <CustomersList />
      <FaceMesh />
    </main>
  );
}
