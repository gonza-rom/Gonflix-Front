import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Checkbox, Datepicker, Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useMovies } from "../contexts/MovieContext";


//validaciones
const schema = yup.object().shape({
  title: yup.string().required('el título es obligatorio'),
  original_title: yup.string().required('el título original es obligatorio'),
  id: yup.number('debe ingresar un numero').typeError('Debes ingresar un número válido').required('el codigo IMDd es obligatorio'),
  release_date: yup.string().required('la fecha de estreno es obligatoria'),
  overview: yup.string().required('el resumen es obligatorio'),
  original_language: yup.string().required('el idioma es obligatorio'),
  poster_path: yup.string().required('la imagen de portada es obligatoria'),
  backdrop_path: yup.string().required('la imagen de reverso es obligatoria'),
  genre_ids: yup.array().min(1, "Debes seleccionar al menos un genero").required("el género es obligatorio"),
})

const AddMovie = () => {
  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm({ resolver: yupResolver(schema) })

  const { getGenres, getLanguages, createMovie } = useMovies()

  const [generos, setGeneros] = useState([])
  const [languages, setLanguages] = useState([])
  const [selectedDate, setSelectedDate] = useState(null);
  register('release_date', { required: true });


  const onSubmit = async (data) => {

    try { //envia el objeto  
      await toast.promise(
        createMovie(data),
        {
          pending: 'Creando película...',
          success: 'Película creada con éxito! 🎉',
          error: 'Error al crear la película. Intenta nuevamente.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Película creada con éxito!',
        confirmButtonText: 'Aceptar'
      })
      reset()
     
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        footer: error.message,
        confirmButtonText: 'Aceptar'
      })
    }

  }

  useEffect(() => {
    const traeDatos = async () => {
      setGeneros(await getGenres())
      setLanguages(await getLanguages())
    }

    traeDatos()
  }, [])

  return (
    <div className="flex flex-content justify-center items-center dark:bg-gray-700 dark:text-gray-100">
      <Card className="flex   w-full max-w-xl rounded-lg shadow dark:bg-gray-800 ">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Nueva película </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title">Título</Label>
              </div>
              <p className='text-red-500'>{errors.title?.message}</p>
              <TextInput {...register('title', { required: true })} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="original_title">Título original</Label>
              </div>
              <p className='text-red-500'>{errors.original_title?.message}</p>
              <TextInput {...register('original_title', { required: true })} type="text" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="id">TMDB id</Label>
              </div>
              <p className='text-red-500'>{errors.id?.message}</p>
              <TextInput {...register('id', { required: true })} type="text" />
            </div>


            <div>
              <div className="mb-2 block">
                <Label htmlFor="release_date">Fecha de estreno</Label>
              </div>
              <p className='text-red-500'>{errors.release_date?.message}</p>
              <Datepicker
                onChange={(date) => {               
                  setSelectedDate(date);
                  setValue('release_date', date);
                }}
                language="es-ES"
                labelTodayButton="Hoy"
                labelClearButton="Limpiar"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="overview">Resumen</Label>
              </div>
              <p className='text-red-500'>{errors.overview?.message}</p>
              <Textarea {...register('overview', { required: true })} />
            </div>

            <div className="flex flex-content flex-row">
              <div className="w-80 ">
                <div className="mb-2 ">
                  <p className='text-red-500'>{errors.adult?.message}</p>
                  <Label htmlFor="adult">Para adultos </Label>
                  <Checkbox {...register('adult', { required: true })} />
                </div>
              </div>

              <div>
                <div className="mb-2 block ">
                  <Label htmlFor="original_language">Idioma original</Label>
                </div>
                <p className='text-red-500'>{errors.original_language?.message}</p>
                <Select {...register('original_language', { required: true })} type="text" >
                  {
                    languages.map(lang => (
                      <option key={lang._id} value={lang.iso_639_1}>{lang.english_name}</option>
                    ))
                  }
                </Select>
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="poster_path">Imágen de portada</Label>
              </div>
              <p className='text-red-500'>{errors.poster_path?.message}</p>
              <TextInput {...register('poster_path', { required: true })} type="text" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="backdrop_path">Imágen de reverso</Label>
              </div>
              <p className='text-red-500'>{errors.backdrop_path?.message}</p>
              <TextInput {...register('backdrop_path', { required: true })} type="text" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="genre_ids">Generos</Label>
              </div>
              <p className='text-red-500'>{errors.genre_ids?.message}</p>
              <Select {...register('genre_ids', { required: true })} type="text" multiple>
                {
                  generos.map(gen => (
                    <option key={gen._id} value={gen.id}>{gen.name}</option>
                  ))
                }
              </Select>
            </div>



            <div className="w-full">
              <Button type="submit">Guardar</Button>
            </div>


          </div>
        </form>
      </ Card>
    </div>
  );
}
export default AddMovie
