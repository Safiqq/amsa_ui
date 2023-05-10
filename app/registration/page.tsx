'use client';

import Navbar from '@/components/Navbar';
import PopupModal from '@/components/PopupModal';
import React, { useState, useEffect } from 'react';

const UPLOAD_URL = "https://amsa-ui-be.vercel.app/upload/";

interface IRegistData {
  nama: string,
  noHp: string,
  email: string,
  instansi: string,
  pekerjaan: string,
  bundle: number,
  kodeReferral: string,
  buktiTransfer: {
    file: string,
    filename: string,
    mimetype: string,
  },
  namaAkunTransfer: string,
  bundleBuddies: string[],
}

console.warn = () => { };
export default function FormPage() {
  const [registData, setRegistData] = useState<IRegistData>({
    nama: '',
    noHp: '',
    email: '',
    instansi: '',
    pekerjaan: '',
    bundle: 0,
    kodeReferral: '',
    buktiTransfer: {
      file: '',
      filename: '',
      mimetype: '',
    },
    namaAkunTransfer: '',
    bundleBuddies: [],
  });
  const [modal, setModal] = useState({
    isVisible: false,
    type: '',
    message: '',
  });
  const [harga, setHarga] = useState(0);

  const handleModal = (isVisible: boolean, type: string, message: string) => {
    setModal({
      isVisible: isVisible,
      type: type,
      message: message,
    });
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    if (name === "bundle") {
      const newBundleBuddies = Array(parseInt(value) - 1).fill('');
      for (let i = 0; i < Math.min(registData["bundle"], parseInt(value) - 1); i++) {
        newBundleBuddies[i] = registData["bundleBuddies"][i];
      }
      setRegistData({ ...registData, [name]: parseInt(value), bundleBuddies: newBundleBuddies });
    } else setRegistData({ ...registData, [name]: value });
  };

  const handleBundleInputChange = (event: any, index: any) => {
    let newBundleBuddies = [...registData["bundleBuddies"]];
    newBundleBuddies[index] = event.target.value;
    setRegistData({ ...registData, bundleBuddies: newBundleBuddies });
  };

  const handleFileChange = (event: { target: { name: any; value: any, files: any; }; }) => {
    const { name, value, files } = event.target;
    if (files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function (e) {
        if (e.target) {
          setRegistData({ ...registData, [name]: { file: e.target.result, filename: value.split('\\').pop().split('/').pop(), mimetype: files[0].type } });
        }
      };
    }
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 201) {
          handleModal(true, "success", "Registrasi berhasil!");
        } else {
          handleModal(true, "error", data.message);
        }
      })
      .catch(error => {
        console.error(error);
        handleModal(true, "error", "Terjadi error!");
      });
  };

  const hitungHarga = () => {
    let price;

    if (registData["pekerjaan"] === "Spesialis") price = 320000;
    else if (registData["pekerjaan"] === "Dokter") price = 215000;
    else if (registData["pekerjaan"] === "Mahasiswa") price = 95000;
    else price = 0;

    if (registData["bundle"] === 0) price = 0;
    else price *= registData["bundle"];

    if (price > 0) {
      if (registData["bundle"] === 2) price -= (5000 * registData["bundle"]);
      else if (registData["bundle"] === 4) price -= (10000 * registData["bundle"]);
      else if (registData["bundle"] === 5) price -= (15000 * registData["bundle"]);
      else if (registData["bundle"] === 8) price -= (30000 * registData["bundle"]);
    }

    setHarga(price);
  }

  useEffect(() => {
    hitungHarga();
  }, [registData]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
      <Navbar />
      {modal["isVisible"] && <PopupModal type={modal["type"]} message={modal["message"]} onClose={() => { handleModal(false, '', '') }} />}
      <div className="flex flex-col items-center justify-center py-6 w-full sm:px-6 lg:px-8">
        <div className="lg:my-10 my-2 sm:mx-auto sm:w-full">
          <h2 className="text-center text-5xl text-white font-rose-knight">Registrasi Symposium <br></br> and Workshop</h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="nama" type="text" required
                    value={registData["nama"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nomor WA <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="noHp" type="tel" pattern="[0]{1}[0-9]{9,12}" required
                    value={registData["noHp"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="email" type="email" required
                    value={registData["email"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Asal Instansi <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="instansi" type="text" required
                    value={registData["instansi"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pekerjaan <sup className="text-red-500">*</sup>
                </label>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Spesialis" checked={registData["pekerjaan"] === "Spesialis"} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Spesialis
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Dokter" checked={registData["pekerjaan"] === "Dokter"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Dokter
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Mahasiswa" checked={registData["pekerjaan"] === "Mahasiswa"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Mahasiswa
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pilihan Bundle <sup className="text-red-500">*</sup>
                </label>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="1" checked={registData["bundle"] === 1} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Regular
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="2" checked={registData["bundle"] === 2}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 2
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="4" checked={registData["bundle"] === 4}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 4
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="5" checked={registData["bundle"] === 5}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 5
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="8" checked={registData["bundle"] === 8}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 8
                  </label>
                </div>
              </div>

              <div className={`${registData["bundle"] > 1 ? "" : "hidden"}`}>
                <label className="block text-sm font-medium text-gray-700">
                  Anggota Bundle <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  {registData["bundleBuddies"].map((input, index) => (
                    <input name="bundleBuddies" key={index} type="text" value={input}
                      placeholder={`Nama Anggota ${index + 1}`}
                      className="my-1.5 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => handleBundleInputChange(e, index)}
                      required={registData["bundle"] > 1}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kode Referral (opsional)
                </label>
                <div className="mt-1">
                  <input name="kodeReferral" type="text" value={registData["kodeReferral"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-right text-sm font-medium text-gray-700">
                  Total Harga: {harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bukti Transfer <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="buktiTransfer" type="file" accept="image/png, image/jpeg" required
                    onChange={handleFileChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Akun Transfer <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="namaAkunTransfer" type="text" value={registData["namaAkunTransfer"]} required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}