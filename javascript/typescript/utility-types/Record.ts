/** Record<Keys, Type> */

interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 2, breed: 'Persian' },
  boris: { age: 4, breed: 'Maine Coon' },
  mordred: { age: 6, breed: 'British' },
}

cats.boris;
