import { useEffect, useState, useCallback } from 'react';
import { useContract, useSigner } from 'wagmi';

//import contracts from '../../contracts/contract.json';
import contractABI from '../../contracts/contract.json';
import { NETWORK_ID } from '../../config';

export const Greeter = () => {
  const chainId = NETWORK_ID;
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [newGreeter, setNewGreeter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: signerData } = useSigner();

  const greeterAddress = "0x64503b81Ad71160a799d41cc4528635c29cFdCC7";
  const greeterABI = contractABI.abi;

 // const greeterAddress = contracts[chainId][0].contracts.Greeter.address;
  //const greeterABI = contracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    addressOrName: greeterAddress,
    contractInterface: greeterABI,
    signerOrProvider: signerData,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await greeterContract.mintQuiz1(newGreeter);
      setNewGreeter('');
      await tx.wait();
      setLoading(false);
    } catch (error) {
      setError('txn failed, check contract');
      setLoading(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await greeterContract.mintQuiz2(newGreeter);
      setNewGreeter('');
      await tx.wait();
      setLoading(false);
    } catch (error) {
      setError('txn failed, check contract');
      setLoading(false);
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await greeterContract.mintQuiz3(newGreeter);
      setNewGreeter('');
      await tx.wait();
      setLoading(false);
    } catch (error) {
      setError('txn failed, check contract');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
    <div style={{ margin: '20px' }}>
      <h1>Lirn.io Certs</h1>
      <p>Quiz 1 - input address to send out</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          value={newGreeter}
          onChange={(e) => setNewGreeter(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

      <p>Quiz 2 - input address to send out</p>
      <form onSubmit={(e) => handleSubmit2(e)}>
        <input
          required
          value={newGreeter}
          onChange={(e) => setNewGreeter(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

      <p>Quiz 3 - input address to send out</p>
      <form onSubmit={(e) => handleSubmit3(e)}>
        <input
          required
          value={newGreeter}
          onChange={(e) => setNewGreeter(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
