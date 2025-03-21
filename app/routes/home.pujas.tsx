import CardPuja from '@/components/cardpuja';
import { prisma } from '@/utils/db.server';
import { mockPujas } from '@/utils/mocks/pujas';
import { useLoaderData } from '@remix-run/react';
import { format } from 'date-fns';

export interface PujaResponse {
  createdBy: {
    id: string;
    name: string;
    email: string;
    password: string;
  };

  id: number;
  name: string;
  initialPrice: number;
  lastPayer: string | null;
  createdById: string;
  finalDate: string;
  startDate: string;
}

export async function loader() {
  const pujas = await prisma.puja.findMany({
    include: { createdBy: true },
  });
  const formattedPujas: PujaResponse[] = pujas.map((puja) => ({
    ...puja,
    finalDate: format(new Date(puja.finalDate), 'dd/MM/yyyy'), // Formato de fecha 'día/mes/año'
    startDate: format(new Date(puja.startDate), 'dd/MM/yyyy'), // Formato de fecha 'día/mes/año'
  }));

  return Response.json(formattedPujas.length > 0 ? formattedPujas : mockPujas);
}

export default function Pujas() {
  const pujas = useLoaderData<PujaResponse[]>();
  return (
    <>
      <h1 className="text-center mb-5">Pujas page</h1>

      <section className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
        {pujas.map((puja) => (
          <CardPuja key={puja.id} puja={puja} />
        ))}
      </section>
    </>
  );
}
