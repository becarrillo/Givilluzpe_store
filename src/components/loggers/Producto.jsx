/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect, useRef } from "react";
import { TodoContext } from "../../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { ChaoticOrbit } from '@uiball/loaders';
import firebase from "../../firebase";


export function ProductoLogger() {
    var picFileSt = null;
    const apiContext = useContext(TodoContext);
    const navigate = useNavigate();
    const savingBtnRef = useRef();

    const sendNewProducto = async ev => {
        ev.preventDefault();

        const toSaveConfirm = window.confirm("¿Estás seguro(a) de realizar la acción? Se guardará el nuevo producto");

        if (toSaveConfirm) {
            setPageJsxTemplate(
                <div className="flex flex-col space-y-3.5 py-72">
                    <div className="mx-auto">
                        <ChaoticOrbit
                            size={25}
                            speed={1.5}
                            color="black"
                        />
                    </div>
                    <h3 className="text-lg mx-auto">Esperar</h3>
                </div>
            );
            console.log(picFileSt);
            const picUrlResult = await apiContext.fb.uploadFile(picFileSt);
            apiContext.productObj["foto_url"] = picUrlResult;
            await firebase.saveProducto(apiContext.productObj["referencia"], apiContext.productObj);
            navigate("/admin");
        }
    }

    const [pageJsxTemplate, setPageJsxTemplate] = useState(
        <div className="flex flex-col space-y-9 px-2 py-3">
            <h2 className="text-center text-2xl text-cyan-800 font-semibold mt-3">Confirmar datos producto nuevo</h2>
            <hr />
            <table className="shadow-sm shadow-zinc-500 mx-auto mb-7 w-9/12">
                <thead>
                    <tr className="bg-french-rose text-white h-8">
                        <th className="text-start">Campo</th>
                        <th>Valor</th>
                        <th className="text-center">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-100">
                        <td>Categoría</td>
                        <td className="text-center">{apiContext.productObj["categoria"]}</td>
                        <td className="text-center">
                            <div>
                                <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                                <button className="rounded-sm bg-red-500 text-sm text-white font-semibold px-2">Borrar</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-white">
                        <td>Referencia</td>
                        <td className="text-center">{apiContext.productObj["referencia"]}</td>
                        <td className="text-center">
                            <div>
                                <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                                <button className="rounded-sm bg-red-500 text-sm text-white font-semibold px-2">Borrar</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td>Detalle</td>
                        <td className="text-center">{apiContext.productObj["detalle"]}</td>
                        <td className="text-center">
                            <div>
                                <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                                <button className="rounded-sm bg-red-500 text-sm text-white font-semibold px-2">Borrar</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-white">
                        <td>Precio</td>
                        <td className="text-center">{apiContext.productObj["precio"]}</td>
                        <td className="text-center">
                            <div>
                                <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                                <button className="rounded-sm bg-red-500 text-sm text-white font-semibold px-2">Borrar</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td>Cantidad</td>
                        <td className="text-center">{apiContext.productObj["cantidad"]}</td>
                        <td className="text-center">
                            <div>
                                <button className="rounded-sm bg-blue-500 text-sm text-white font-semibold px-2">Editar</button>
                                <button className="rounded-sm bg-red-500 text-sm text-white font-semibold px-2">Borrar</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="flex flex-col rounded-lg shadow-sm shadow-zinc-500 mx-auto px-3 py-2 
              w-full md:w-7/12 lg:w-5/12 xl:w-7/12 2x:w-7/12"
            >
                <h3 className="text-lg text-cyan-900 mx-auto py-5">Agrega imágen/fotografía desde tus archivos</h3>

                <div className="grid grid-rows-2 mx-auto">
                    <label htmlFor="pic-file" className="text-sm font-semibold">Imágen/fotografía</label>
                    <input
                        type="file"
                        accept="image/jpeg"
                        required={true}
                        id="pic-file"
                        name="pic-file"
                        onChange={ev => {
                            savingBtnRef.current["disabled"] = false,
                                picFileSt = ev.target.files.item(0)
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-md bg-slate-200 text-zinc-700 font-semibold self-center mt-7 px-7 py-2 w-5/12 hover:bg-cyan-100 
                  hover:text-black hover:shadow-sm hover:shadow-zinc-500"
                >
                    Agregar
                </button>
            </div>

            <button
                type="button"
                className="rounded-sm bg-green-600 text-white mx-auto py-2 w-full md:w-7/12 lg:w-5/12 xl:w-7/12 2x:w-7/12 hover:bg-green-500 disabled:bg-zinc-300"
                ref={savingBtnRef}
                disabled={true}
                onClick={
                    ev => { sendNewProducto(ev) }
                }
            >
                GUARDAR
            </button>
        </div>
    );

    useEffect(() => {
        console.log(apiContext.productObj, " es el objeto de los datos Producto");
    }, [apiContext.productObj]);

    return pageJsxTemplate;
}