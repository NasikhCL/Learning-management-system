import mongoose, { Document, Model } from "mongoose";


export interface IVideo {
    videoNumber:number;
    title: string;
    url: string;
    duration: number;
  }

export interface ICourse extends Document{
    title: string;
    description: string;
    instructor: string;
    videos: IVideo[];
    thumbnail: {
        public_id: string,
        url: string
    };
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
        videoNumber:{
            type: Number,
            required: true
        },
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
        public_id: String,
        url: String
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