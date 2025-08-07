import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import SignInForm from "./components/sign-in-form";
import SignUpForm from "./components/sign-up-form";

export default function AthenticatePage() {
  return (
    <div className="flex w-full flex-col gap-6 p-5">
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-ut">Criar Conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
            <SignInForm />
        </TabsContent>
        <TabsContent value="sign-ut">
            <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
