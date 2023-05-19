'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PopupModal from '@/components/PopupModal';
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Copy from '/public/copy.svg';

const UPLOAD_URL = "https://amsa-ui-be.vercel.app/upload/";

interface IBuddiesData {
  nama: string,
  noHp: string,
  email: string,
  instansi: string,
};

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
  bundleBuddies: IBuddiesData[],
  day: number,
};

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
    day: 0,
  });
  const [modal, setModal] = useState({
    isVisible: false,
    type: '',
    message: '',
  });
  const [harga, setHarga] = useState(0);
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleModal = (isVisible: boolean, type: string, message: string) => {
    setModal({
      isVisible: isVisible,
      type: type,
      message: message,
    });
  };

  const handleReferralCodeChange = (event: any) => {
    if (!referralCode) {
      const referralCodes = ["RANPD1", "RANPD2", "RANPD3", "RANPD4", "RANPD5", "RANPD6"];
      const value = registData["kodeReferral"];
      if (referralCodes.includes(value.toUpperCase())) {
        setReferralCode(true);
        handleModal(true, "success", "Kode referral berhasil digunakan.");
      } else {
        handleModal(true, "error", "Kode referral tidak tersedia.");
      }
    }
  }

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    let newRegistData = { ...registData };
    if (name === "bundle") {
      const arrLen = parseInt(value) > 1 ? parseInt(value) - 1 : 0;
      const newBundleBuddies = Array(arrLen).fill({ nama: '', noHp: '', email: '', instansi: '' });
      for (let i = 0; i < Math.min(registData["bundleBuddies"].length, arrLen); i++) {
        newBundleBuddies[i] = registData["bundleBuddies"][i];
      }
      newRegistData = { ...newRegistData, [name]: parseInt(value), bundleBuddies: newBundleBuddies };
    } else if (name === "day") {
      newRegistData = { ...newRegistData, [name]: parseInt(value) };
    } else newRegistData = { ...newRegistData, [name]: value };

    if (registData.pekerjaan !== "Mahasiswa" && registData.bundle === -1) {
      newRegistData = { ...newRegistData, bundle: 0 };
    }

    if (registData.pekerjaan !== "Mahasiswa" && registData.bundle !== -1 && registData.day > 0) {
      newRegistData = { ...newRegistData, day: 0 };
    }

    setRegistData(newRegistData);
  };

  const handleBundleInputChange = (event: any, index: any) => {
    const name = event.target.name.split('.')[1];
    let newBundleBuddies = [...registData["bundleBuddies"]];
    newBundleBuddies[index] = { ...newBundleBuddies[index], [name]: event.target.value };
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
    else if (registData["pekerjaan"] === "Mahasiswa" && registData["bundle"] === -1) price = 50000;
    else if (registData["pekerjaan"] === "Mahasiswa") price = 95000;
    else price = 0;

    if (registData["bundle"] === 0) price = 0;
    else if (registData["bundle"] > 0) price *= registData["bundle"];

    if (price > 0) {
      if (registData["bundle"] === 2) price -= (5000 * registData["bundle"]);
      else if (registData["bundle"] === 4) price -= (10000 * registData["bundle"]);
      else if (registData["bundle"] === 5) price -= (15000 * registData["bundle"]);
      else if (registData["bundle"] === 8) price -= (30000 * registData["bundle"]);

      if (referralCode) price -= 5000;
    }

    setHarga(price);
  }

  useEffect(() => {
    hitungHarga();
  }, [registData, referralCode]);

  return (
    <main className="flex min-h-screen flex-col justify-between items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
      <div className="w-full flex flex-col items-center mb-10">
        <Navbar />
        {modal["isVisible"] && <PopupModal type={modal["type"]} message={modal["message"]} onClose={() => { handleModal(false, '', '') }} />}
        <div className="lg:my-10 my-4 sm:mx-auto sm:w-full">
          <div className="lg:my-10 my-4 sm:mx-auto sm:w-full">
            <h2 data-aos="flip-down" className='text-center text-xl lg:text-5xl text-white font-rose-knight'>
              Registrasi Symposium <br></br> and Workshop
            </h2>
          </div>
        </div>
        <div className="w-[90%] mb-8 font-alegreya text-gray-700 text-sm md:text-base">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className=''>
                <div>
                  Nama <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  <input name="nama" type="text" required
                    value={registData["nama"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div>
                  Nomor WA <sup className="text-red-500">*</sup>
                </div>
                <div className='opacity-60'>Contoh: 081234567890</div>
                <div className="mt-1">
                  <input name="noHp" type="tel" pattern="[0]{1}[0-9]{9,12}" required
                    value={registData["noHp"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div>
                  Email <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  <input name="email" type="email" required
                    value={registData["email"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div>
                  Asal Instansi <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  <input name="instansi" type="text" required
                    value={registData["instansi"]}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div>
                  Pekerjaan <sup className="text-red-500">*</sup>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Spesialis" checked={registData["pekerjaan"] === "Spesialis"} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Spesialis
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Dokter" checked={registData["pekerjaan"] === "Dokter"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Dokter
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="pekerjaan" type="radio" value="Mahasiswa" checked={registData["pekerjaan"] === "Mahasiswa"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Mahasiswa
                  </div>
                </div>
              </div>

              <div>
                <div>
                  Pilihan Bundle <sup className="text-red-500">*</sup>
                </div>
                {registData["pekerjaan"] === "Mahasiswa" && (<div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="-1" checked={registData["bundle"] === -1} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    1 Day Pass
                  </div>
                </div>)}
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="1" checked={registData["bundle"] === 1} required
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Regular
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="2" checked={registData["bundle"] === 2}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Bundle of 2
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="4" checked={registData["bundle"] === 4}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Bundle of 4
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="5" checked={registData["bundle"] === 5}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Bundle of 5
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="bundle" type="radio" value="8" checked={registData["bundle"] === 8}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <div className="ml-3">
                    Bundle of 8
                  </div>
                </div>
              </div>

              {registData["pekerjaan"] === "Mahasiswa" && registData["bundle"] === -1 && (<div>
                <div>
                  Pilihan Day <sup className="text-red-500">*</sup>
                </div>
                <div className="flex items-center my-2">
                  <input name="day" type="radio" value="1" checked={registData["day"] === 1}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    required={registData.bundle === -1}
                  />
                  <div className="ml-3">
                    Day 1
                  </div>
                </div>
                <div className="flex items-center my-2">
                  <input name="day" type="radio" value="2" checked={registData["day"] === 2}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    required={registData.bundle === -1}
                  />
                  <div className="ml-3">
                    Day 2
                  </div>
                </div>
              </div>)}

              <div className={`${registData["bundle"] > 1 ? "" : "hidden"}`}>
                <div>
                  Anggota Bundle <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  {registData["bundleBuddies"].map((input, index) => (
                    <div key={index} className={`mb-4 border-gray-300 ${index != registData["bundleBuddies"].length - 1 ? 'pb-2 border-b-2' : ''}`}>
                      {/* Nama Anggota x */}
                      <input name="bundleBuddies.nama" type="text" value={input["nama"]}
                        placeholder={`Nama Anggota ${index + 1}*`}
                        className="my-1.5 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => handleBundleInputChange(e, index)}
                        required={registData["bundle"] > 1}
                      />

                      {/* No. WA Anggota x */}
                      <input name="bundleBuddies.noHp" type="tel" pattern="[0]{1}[0-9]{9,12}" value={input["noHp"]}
                        placeholder={`Nomor WA Anggota ${index + 1}*`}
                        className="my-1.5 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => handleBundleInputChange(e, index)}
                        required={registData["bundle"] > 1}
                      />

                      {/* Email Anggota x */}
                      <input name="bundleBuddies.email" type="email" value={input["email"]}
                        placeholder={`Email Anggota ${index + 1}*`}
                        className="my-1.5 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => handleBundleInputChange(e, index)}
                        required={registData["bundle"] > 1}
                      />

                      {/* Asal Instansi Anggota x */}
                      <input name="bundleBuddies.instansi" type="text" value={input["instansi"]}
                        placeholder={`Asal Instansi Anggota ${index + 1}*`}
                        className="my-1.5 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => handleBundleInputChange(e, index)}
                        required={registData["bundle"] > 1}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div>
                  Kode Referral (opsional)
                </div>
                <div className="mt-1 flex items-center">
                  <input name="kodeReferral" type="text" value={registData["kodeReferral"]}
                    onChange={handleInputChange}
                    className="appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    readOnly={referralCode}
                  />
                  <div
                    onClick={handleReferralCodeChange}
                    className={`${referralCode ? "bg-gray-400" : "cursor-pointer bg-indigo-600 hover:bg-indigo-700"} mx-2 py-2 px-4 text-white rounded-lg`}>Check</div>
                </div>
              </div>

              <div>
                <div className="text-right">
                  Total Harga: {harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </div>
              </div>

              <div>
                <div>Nomor Rekening</div>
                <div className='flex-col mt-1'>
                  <div className='flex items-center'>
                    <div>BCA 5771089926</div>
                    <CopyToClipboard text="5771089926" onCopy={handleCopy}>
                      <div className='cursor-pointer ml-1'>
                        <Image src={Copy} height="20" width="20" alt="copy" className='mr-1 px-[3px] rounded-md' />
                      </div>
                    </CopyToClipboard>
                    <div>{!copied ? '' : 'Copied!'}</div>
                  </div>
                  <div>a/n Amanda Shasykirani</div>
                </div>
              </div>

              <div>
                <div>
                  Bukti Transfer <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  <input name="buktiTransfer" type="file" accept="image/png, image/jpeg" required
                    onChange={handleFileChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div>
                  Nama Akun Transfer <sup className="text-red-500">*</sup>
                </div>
                <div className="mt-1">
                  <input name="namaAkunTransfer" type="text" value={registData["namaAkunTransfer"]} required
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div >
      <Footer />
    </main >
  );
};