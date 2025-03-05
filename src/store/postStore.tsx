import { PostResponse } from '@/types/post.type';
import { UserPost } from '@/types/user.type';
import { create } from 'zustand';

interface CommentType {
  id: string;
  description: string;
  postId: string;
  user: UserPost;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  timeline: PostResponse[];
  setTimeline: (posts: PostResponse[]) => void;
  addPostToTimeline: (post: PostResponse) => void;
  updatePostInTimeline: (postId: string, updatedPost: PostResponse) => void;
  addComment: (postId: string, comment: CommentType) => void;
  deleteComment: (postId: string, commentId: string) => void;
  toggleLike: (postId: string, userId: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  timeline: [],

  setTimeline: (posts) => set({ timeline: posts }),

  addPostToTimeline: (post) =>
    set((state) => ({ timeline: [post, ...state.timeline] })),

  updatePostInTimeline: (postId, updatedPost) =>
    set((state) => ({
      timeline: state.timeline.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      ),
    })),

  addComment: (postId, comment) =>
    set((state) => ({
      timeline: state.timeline.map((post) =>
        post.id === postId
          ? { ...post, comments: [comment, ...post.comments] }
          : post
      ),
    })),

  deleteComment: (postId, commentId) =>
    set((state) => ({
      timeline: state.timeline.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((comment) => comment.id !== commentId),
            }
          : post
      ),
    })),

  toggleLike: (postId, userId) =>
    set((state) => ({
      timeline: state.timeline.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId) // Remove o like
                : [...post.likes, userId], // Adiciona o like
            }
          : post
      ),
    })),
}));
