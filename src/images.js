import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = 'https://dwukeipnfwqxcbgiebcz.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllImagesFromBucket = async (dir = 'images') => {
  try {
    const { data: files, error } = await supabase
      .storage
      .from('matches')
      .list(dir, { limit: 100 });

    if (error) throw error;


    const imageLinks = files.map((file) => {
      const { data } = supabase
        .storage
        .from('matches')
        .getPublicUrl(`${dir}/${file.name}`);
      return data.publicUrl;
    });

    return imageLinks;
  } catch (error) {
    console.error('Error al listar archivos:', error.message);
  }
};




export const getMatch = async () => {
  const images = await getAllImagesFromBucket();
  let index = Math.floor(Math.random() * images.length);
  console.log(index)
  let match = await getAllImagesFromBucket(`images/${index}`);
  return match
}
