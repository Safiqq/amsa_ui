'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

console.warn = () => { };
export default function FormPage() {
  const [formData, setFormData] = useState({
    nama: '',
    noHp: '',
    email: '',
    // tempatLahir: '',
    // tanggalLahir: '',
    instansi: '',
    pekerjaan: '',
    bundle: 0,
    kodeReferral: '',
    buktiTransferBuffer: '',
    buktiTransferFilename: '',
    namaAkunTransfer: '',
  });
  const [harga, setHarga] = useState(0);

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    if (name === "bundle") setFormData({ ...formData, [name]: parseInt(value) });
    else setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event: { target: { name: any; value: any, files: any; }; }) => {
    const { name, value, files } = event.target;
    setFormData({ ...formData, [name + "Buffer"]: files[0], [name + "Filename"]: value });
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    fetch('https://data.mongodb-api.com/app/data-hzefz/endpoint/data/v1/action/insertOne', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'zKYQzKPyjCGeVbkoRQ6pZTLIxvbqVZNTatm7Zn7jHEqSO0ZljACRIRhxFfOpBO87'
      },
      body: JSON.stringify({
        dataSource: "amsui",
        database: "amsui",
        collection: "regist",
        document: formData
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log(formData);
  };

  const hitungHarga = () => {
    let price;

    if (formData["pekerjaan"] === "Spesialis") price = 320000;
    else if (formData["pekerjaan"] === "Dokter") price = 215000;
    else if (formData["pekerjaan"] === "Mahasiswa") price = 95000;
    else price = 0;

    if (formData["bundle"] === 0) price = 0;
    else price *= formData["bundle"];

    if (price > 0) {
      if (formData["bundle"] === 2) price -= (5000 * formData["bundle"]);
      else if (formData["bundle"] === 4) price -= (10000 * formData["bundle"]);
      else if (formData["bundle"] === 5) price -= (15000 * formData["bundle"]);
      else if (formData["bundle"] === 8) price -= (30000 * formData["bundle"]);
    }

    setHarga(price);
  }

  useEffect(() => {
    hitungHarga();
  }, [formData]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen" >
      <Navbar />

      <h2 className="mt-12 text-center text-5xl text-white font-rose-knight">Registrasi Symposium <br></br> and Workshop</h2>
      <div className="flex flex-col items-center justify-center my-6 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="nama" type="text" required
                    value={formData["nama"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  No. HP <sup className="text-red-500">*</sup>
                </label>
                <div className="mt-1">
                  <input name="noHp" type="tel" pattern="[0]{1}[0-9]{9,12}" required
                    value={formData["noHp"]}
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
                    value={formData["email"]}
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
                    value={formData["instansi"]}
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
                  <input name="pekerjaan" type="radio" value="Spesialis" checked={formData["pekerjaan"] === "Spesialis"} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Spesialis
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Dokter" checked={formData["pekerjaan"] === "Dokter"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Dokter
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Mahasiswa" checked={formData["pekerjaan"] === "Mahasiswa"}
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
                  <input name="bundle" type="radio" value="1" checked={formData["bundle"] === 1} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Regular
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="2" checked={formData["bundle"] === 2}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 2
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="4" checked={formData["bundle"] === 4}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 4
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="5" checked={formData["bundle"] === 5}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 5
                  </label>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="8" checked={formData["bundle"] === 8}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bundle of 8
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kode Referral (opsional)
                </label>
                <div className="mt-1">
                  <input name="kodeReferral" type="text" value={formData["kodeReferral"]}
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
                  <input name="buktiTransfer" type="file" value={formData["buktiTransferFilename"]} accept="image/png, image/jpeg" required
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
                  <input name="namaAkunTransfer" type="text" value={formData["namaAkunTransfer"]} required
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
    </main >
  );
}