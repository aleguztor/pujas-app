import { PujaResponse } from '@/routes/home.pujas';
import { useNavigate } from '@remix-run/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export default function CardPuja({ puja }: { puja: PujaResponse }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/home/puja/${puja.id}`, { state: { puja } })} className="w-[350px] cursor-pointer">
      <CardHeader>
        <CardTitle>{puja.name}</CardTitle>
        <CardDescription>DESCRIPCION //TODO</CardDescription>
      </CardHeader>
      <CardContent>
        <p>CONTENIDO //TODO</p>
      </CardContent>
      <CardFooter>
        <p>Termina el: {puja.finalDate}</p>
      </CardFooter>
    </Card>
  );
}
