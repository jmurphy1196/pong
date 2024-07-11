import Button from "../Button";

export default function Hero({setActiveGame}) {
  return (
    <div className='hero'>
      <h1 className='hero__title'>Pong</h1>
      <h2 className='hero__subtitle'>Select Option</h2>
      <div className='hero__options'>
        <Button onClick={(e) => setActiveGame(true)} type='primary'>Create Game</Button>
        <Button type='secondary'>Join Game</Button>
      </div>
    </div>
  );
}
