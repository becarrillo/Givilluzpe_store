/* eslint-disable react/react-in-jsx-scope */
const TBody = ({ products }) => {
    return (
        <>
            {
                products.map(doc => {
                    return (
                        <tr key={doc["id"]} className="divide-x divide-zinc-700 
                        text-lg text-zinc-700 odd:bg-slate-200 even:bg-white"
                        >
                            <td className="rounded-sm px-2 text-sm w-1/4 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["categoria"]}</td>
                            <td className="rounded-sm px-1 text-sm w-1/6 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["id"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["detalle"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["precio"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">{doc["cantidad"]}</td>
                            <td className="rounded-sm px-2 text-sm w-5/12 text-center md:text-lg lg:text-lg xl:text-lg 2xl:text-xl">
                                <div>
                                    <button className="rounded-sm bg-zinc-500 px-2 text-sm text-white hover:bg-air-super-blue">Editar</button>
                                    <button className="rounded-sm bg-red-700 px-2 text-sm text-white hover:bg-french-rose">Borrar</button>
                                </div>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default TBody;