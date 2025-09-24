import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Star, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [hero1, hero2, hero3];

  const featuredDresses = [
    {
      id: 1,
      name: "Elegant Evening Gown",
      price: "$299",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      name: "Casual Summer Dress",
      price: "$149",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
      likes: 18,
      comments: 5,
    },
    {
      id: 3,
      name: "Business Professional",
      price: "$199",
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop",
      likes: 31,
      comments: 12,
    },
    {
      id: 4,
      name: "Party Cocktail Dress",
      price: "$259",
      image: "https://images.unsplash.com/photo-1566479179817-c0e5deb2e22c?w=400&h=500&fit=crop",
      likes: 45,
      comments: 19,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing quality and fast delivery! The dress fit perfectly.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      text: "Love the variety and the request feature. Very innovative!",
      rating: 5,
    },
    {
      name: "Maria Rodriguez",
      text: "Customer service is outstanding. Highly recommend!",
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Fashion ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-4">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">Narasimha's</span>
              <br />
              Shopify
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
              Your Smart Shopping Experience – Simple. Stylish. Automated.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/shop">
                <Button className="btn-hero text-lg px-8 py-4">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
              </Link>
              <Link to="/register">
                <div className="btn-hero-outline">
                  <div className="btn-hero-outline-inner">
                    Register Today
                  </div>
                </div>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Sparkles className="w-5 h-5 mr-2" />
                Request a Dress
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Collections</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium dresses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDresses.map((dress, index) => (
              <Card key={dress.id} className="card-premium group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={dress.image}
                      alt={dress.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                      <Heart className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{dress.name}</h3>
                    <p className="text-2xl font-bold text-gradient mb-4">{dress.price}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {dress.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {dress.comments}
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 btn-hero">
                      Request This Dress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trending <span className="text-gradient">Now</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Most loved pieces by our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDresses.slice(0, 3).map((dress, index) => (
              <div
                key={dress.id}
                className="relative group cursor-pointer animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{dress.name}</h3>
                    <p className="text-lg font-semibold">{dress.price}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className="flex items-center text-sm">
                        <Heart className="w-4 h-4 mr-1 fill-pink-500 text-pink-500" />
                        {dress.likes}
                      </span>
                      <span className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-gradient">Customers Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-premium text-center">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-gradient">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">
                Narasimha's Shopify
              </h3>
              <p className="text-gray-400">
                Your premium fashion destination for smart shopping experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
                <li><Link to="/register" className="hover:text-primary transition-colors">Register</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-2xl">📷</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors text-2xl">💼</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Narasimha's Shopify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;