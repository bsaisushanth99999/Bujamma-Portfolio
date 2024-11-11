

export default function Certifications() {

    const certifications = [{"name" : "Test-1", "pdfImage" : "https://picsum.photos/200"},{"name" : "Test-1", "pdfImage" : "https://picsum.photos/200"}, {"name" : "Test-1", "pdfImage" : "https://picsum.photos/200"}, {"name" : "Test-1", "pdfImage" : "https://picsum.photos/200"}, {"name" : "Test-1", "pdfImage" : "https://picsum.photos/200"}]

  return (
<div className='flex flex-col items-center justify-center min-h-screen overflow-y-auto'>
  <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl">
    Certifications
  </h1>

  <div className='flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-3/4 mt-12 min-h-[80vh] lg:max-h-[40vh] text-center'>
    {certifications.map((x, index) => (
      <div key={index} className='flex items-center justify-center rounded-3xl bg-gray-50 border p-4 min-h-[40vh] lg:max-h-[20vh]'>
        {x.pdfImage}
        <br />
        <br />
        <br />
        {x.name}
      </div>
    ))}
  </div>
</div>

  )
}
