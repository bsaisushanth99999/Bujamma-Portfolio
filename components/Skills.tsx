export default function Skills() {

    const general = ["a", "b", "c", "d", "e"];
    const clinical = ["f", "g", "h", "i", "j", "k"];

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center">
                <div className="relative">
                    <h1 className="uppercase tracking-[20px] text-gray-500 text-2xl mt-12">
                        Skills
                    </h1>
                </div>
            </div>

            <div className="flex-1 mt-6 flex flex-row">
                <div className="flex-1">
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <h1 className="text-3xl font-bold text-indigo-600">
                                Clinical
                            </h1>
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600 to-red-300"></span>
                        </div>
                    </div>
                    {clinical.map((x, index) => (
                        <p key={index} className="ml-16 mt-4">
                            ☞&emsp;<span className="font-mono">{x}</span>
                        </p>
                    ))}
                </div>
                <div className="flex-1">
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <h1 className="text-3xl font-bold text-indigo-600">
                                General
                            </h1>
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600 to-red-300"></span>
                        </div>
                    </div>
                    {general.map((x, index) => (
                        <p key={index} className="ml-16 mt-4">
                            ☞&emsp;<span className="font-mono">{x}</span>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}
