import mongoose, { Document, Model } from "mongoose";


interface IVideo {
    title: string;
    url: string;
    duration: number;
  }

interface ICourse extends Document{
    title: string;
    description: string;
    instructor: string;
    videos: IVideo[];
    thumbnail: string;
    price: number;
    offerPrice?: number;
}

export const courseSchema = new mongoose.Schema<ICourse>({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    videos: [{
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
      }],
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
    },
  },{timestamps:true});
  


const courseModel: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);
export default courseModel;