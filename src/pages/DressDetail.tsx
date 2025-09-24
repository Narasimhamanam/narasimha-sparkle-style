import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Star, ZoomIn, ShoppingBag, Sparkles, ChevronLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DressDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: "",
    email: "",
    size: "",
    address: "",
    message: "",
  });

  // Mock dress data - in real app, this would come from API
  const dress = {
    id: parseInt(id || "1"),
    name: "Elegant Evening Gown",
    price: 299,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop",
    ],
    likes: 24,
    comments: 8,
    category: "Evening",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    description: "This stunning evening gown features a classic silhouette with modern details. Perfect for formal events, galas, and special occasions. The dress is crafted from premium materials with attention to every detail.",
    features: [
      "Premium fabric blend",
      "Elegant draping",
      "Hidden back zipper",
      "Fully lined",
      "Dry clean only",
    ],
    rating: 4.8,
    reviewCount: 156,
  };

  const comments = [
    {
      id: 1,
      user: "Sarah Johnson",
      comment: "Absolutely gorgeous dress! The quality is exceptional.",
      time: "2 hours ago",
      avatar: "👩‍🦰",
    },
    {
      id: 2,
      user: "Emily Chen",
      comment: "Perfect fit and the color is exactly as shown.",
      time: "1 day ago",
      avatar: "👩‍🦱",
    },
    {
      id: 3,
      user: "Maria Rodriguez",
      comment: "Received so many compliments wearing this!",
      time: "3 days ago",
      avatar: "👩‍🦳",
    },
  ];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Request submitted:", requestForm);
    // Reset form
    setRequestForm({
      name: "",
      email: "",
      size: "",
      address: "",
      message: "",
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Handle comment submission
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="font-medium">{dress.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/shop" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-2xl"
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Additional Images */}
            <div className="grid grid-cols-3 gap-4">
              {dress.additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${dress.name} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4">{dress.category}</Badge>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{dress.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(dress.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {dress.rating} ({dress.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <p className="text-4xl font-bold text-gradient mb-6">${dress.price}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {dress.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Features</h3>
              <ul className="space-y-2">
                {dress.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Available Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {dress.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Available Colors</h3>
              <div className="flex space-x-2">
                {dress.colors.map((color) => (
                  <Badge key={color} variant="outline">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full btn-hero text-lg py-4">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Request This Dress
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Request Dress</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRequestSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={requestForm.name}
                        onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                        className="input-premium"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                        className="input-premium"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="size">Size</Label>
                      <Select
                        value={requestForm.size}
                        onValueChange={(value) => setRequestForm({ ...requestForm, size: value })}
                      >
                        <SelectTrigger className="input-premium">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {dress.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea
                        id="address"
                        value={requestForm.address}
                        onChange={(e) => setRequestForm({ ...requestForm, address: e.target.value })}
                        className="input-premium"
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Message</Label>
                      <Textarea
                        id="message"
                        value={requestForm.message}
                        onChange={(e) => setRequestForm({ ...requestForm, message: e.target.value })}
                        className="input-premium"
                        rows={2}
                        placeholder="Any special requests or notes..."
                      />
                    </div>
                    <Button type="submit" className="w-full btn-hero">
                      Submit Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex-1 ${isLiked ? "text-red-500 border-red-500" : ""}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500" : ""}`} />
                  {isLiked ? "Liked" : "Like"} ({dress.likes + (isLiked ? 1 : 0)})
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comments ({dress.comments})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Comments & Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment Form */}
              <form onSubmit={handleCommentSubmit} className="flex space-x-4">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="input-premium flex-1"
                />
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl">{comment.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold">{comment.user}</span>
                        <span className="text-sm text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-muted-foreground">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            You May Also <span className="text-gradient">Like</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="card-premium group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={`https://images.unsplash.com/photo-${item === 1 ? '1496747611176-843222e1e57c' : item === 2 ? '1485462537746-965f33f7f6a7' : item === 3 ? '1566479179817-c0e5deb2e22c' : '1572804013309-59a88b7e92f1'}?w=400&h=500&fit=crop`}
                      alt={`Related dress ${item}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">Related Dress {item}</h3>
                    <p className="text-lg font-bold text-gradient">${149 + item * 50}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressDetail;