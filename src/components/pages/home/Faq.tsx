import Accordion from "@/components/Accordion";


const faqs = [
    {
      title: "Kenapa ketika membuat / join room proses nya lama?",
      explain:
        "Kami meminta maaf atas ketidak-nyamannya. Kami memerlukan waktu untuk menghubungkan anda ke database kami. Jika proses pembuat room / join room lama, anda dapat merefresh halaman, setelah itu anda bisa mencoba untuk membuat / bergabung ke room",
    },
    {
      title: "Indicator kamera saya hidup saat off cam | *OOOMAGAT!😯",
      explain:
        "Jangan Khawatir, privasi anda hal terbesar yang harus kami jaga. Indicator kamera aktif hanya untuk mem-proses percepatan saat anda on/off cam. User lain tidak bisa melihat anda saat off cam mereka hanya melihat anda saat anda on cam.",
    },
    {
      title: "User yang join tidak tampil di room | *user menghilang dari line🤷",
      explain:
        "Ini terjadi karena saat pertama kali anda memasuki room, browser memerlukan akses ke kamera dan microphone anda. sehingga beberapa proses ter-block oleh request permintaan izin tersebut.",
    },
    {
      title: "Kenapa url nya tidak jelas? | *yang bener aja!",
      explain:
        "Server yang dipakai aplikasi ini adalah server gratis. Kenapa? karena untuk membuat url nya menjadi static butuh biaya yang cukup lumayan untuk menyimpan aplikasi ini ke dalam server asli",
    },
    {
      title: "Apakah saya bisa mendapat source code ini? | *rugi dong!",
      explain:
        "Tapi boong! hehehe (hanya bercanda). Jika teman-teman developer tertarik dengan project ini dan ingin mengembangkan aplikasi ini  sebagai portfolio teman-teman, kalian bisa mengunjungi repo github saya di https://github.com/AmienulRana/meet-yuk",
    },
  ];
  

export default function Faq(){
    return (
        <Accordion items={faqs}/>
    )
}