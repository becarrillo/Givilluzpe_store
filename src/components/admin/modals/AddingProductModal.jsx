/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
const AddProduct = () => {
    
    return (
        <div className="mx-auto mt-11 px-8 py-3 space-y-6 h-80 modal" id="add_prod_modal">
            <h6 className="text-center">Crea/sube un nuevo producto</h6>
            <hr></hr>
            <form className="grid grid-rows-3 grid-cols-3" >
                <input type="text" name="categoria" className="rounded-md bg-slate-100 shadow-sm shadow-zinc-600 text-center w-20 
                h-9 md:w-32 lg:w-32 xl:w-32 2xl:w-36" placeholder="categoría"
                />
                <input type="text" name="detalle" className="rounded-md bg-slate-100 shadow-sm 
                shadow-zinc-600 text-center w-24 h-9 mr-7 md:w-32 md:mr-0 
                lg:w-32 lg:mr-0 xl:w-32 xl:mr-0 2xl:w-36 2xl:mr-0" placeholder="detalle"
                />
                <input type="number" name="cantidad" className="rounded-md bg-slate-100 shadow-sm shadow-zinc-600 
                text-center w-20 h-9 md:w-32 lg:w-32 xl:w-32 2xl:w-36" placeholder="cantidad" 
                />
                <input type="text" name="price" className="col-span-2 rounded-md bg-slate-100 shadow-sm 
                shadow-zinc-600 text-center mr-1 h-9" placeholder="precio" 
                />
                <div className="flex flex-col space-x-1">
                    <input type="text" name="referencia" className="rounded-md bg-slate-100 shadow-sm shadow-zinc-700 
                    text-center w-20 h-9 md:w-32 lg:w-32 xl:w-32 2xl:w-36" placeholder="referencia" required={true}
                    />
                    <small className="text-red-700">* Obligatorio</small>
                </div>
                
                <button type="submit" className="col-span-3 mx-auto mt-4 px-9 py-1 rounded-sm bg-cyan-700 text-center 
                text-semibold text-maximum-green-yellow w-11/12 h-9 hover:bg-middle-blue hover:text-zinc-700" 
                >
                    OK
                </button>
            </form>
        </div>
    )
}

export default AddProduct;