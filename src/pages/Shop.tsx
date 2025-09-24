import { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, List, Filter, Heart, MessageCircle, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Shop = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const dresses = [
    {
      id: 1,
      name: "Elegant Evening Gown",
      price: 299,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      likes: 24,
      comments: 8,
      category: "Evening",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Navy"],
      description: "Perfect for formal events and special occasions",
    },
    {
      id: 2,
      name: "Casual Summer Dress",
      price: 149,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=500&fit=crop",
      likes: 18,
      comments: 5,
      category: "Casual",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Blue", "White"],
      description: "Light and comfortable for everyday wear",
    },
    {
      id: 3,
      name: "Business Professional",
      price: 199,
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&h=500&fit=crop",
      likes: 31,
      comments: 12,
      category: "Professional",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray"],
      description: "Professional attire for the modern woman",
    },
    {
      id: 4,
      name: "Party Cocktail Dress",
      price: 259,
      image: "https://images.unsplash.com/photo-1566479179817-c0e5deb2e22c?w=400&h=500&fit=crop",
      likes: 45,
      comments: 19,
      category: "Party",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Red", "Pink"],
      description: "Stand out at any party or celebration",
    },
    {
      id: 5,
      name: "Bohemian Maxi Dress",
      price: 179,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
      likes: 22,
      comments: 7,
      category: "Casual",
      sizes: ["S", "M", "L"],
      colors: ["Floral", "Green"],
      description: "Free-spirited style for the boho chic look",
    },
    {
      id: 6,
      name: "Classic Little Black Dress",
      price: 229,
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=500&fit=crop",
      likes: 67,
      comments: 28,
      category: "Classic",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black"],
      description: "Timeless elegance that never goes out of style",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Red", "Blue", "Pink", "Gray", "Navy", "Green", "Floral"];
  const categories = ["All", "Evening", "Casual", "Professional", "Party", "Classic"];

  const filteredDresses = dresses.filter((dress) => {
    const matchesSearch = dress.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = !selectedSize || dress.sizes.includes(selectedSize);
    const matchesColor = !selectedColor || dress.colors.includes(selectedColor);
    return matchesSearch && matchesSize && matchesColor;
  });

  const sortedDresses = [...filteredDresses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popularity":
        return b.likes - a.likes;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Premium</span> Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover your perfect dress from our curated selection
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-2">Search Dresses</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-premium pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="input-premium">
                  <SelectValue placeholder="All Sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sizes</SelectItem>
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="input-premium">
                  <SelectValue placeholder="All Colors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Colors</SelectItem>
                  {colors.map((color) => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="input-premium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-12 w-12"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-12 w-12"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Showing {sortedDresses.length} of {dresses.length} dresses
          </p>
          
          {/* Active Filters */}
          <div className="flex items-center space-x-2">
            {selectedSize && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedSize("")}>
                Size: {selectedSize} ×
              </Badge>
            )}
            {selectedColor && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedColor("")}>
                Color: {selectedColor} ×
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => setSearchQuery("")}>
                Search: {searchQuery} ×
              </Badge>
            )}
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
          : "space-y-6"
        }>
          {sortedDresses.map((dress) => (
            <Card key={dress.id} className={`card-premium group cursor-pointer ${
              viewMode === "list" ? "flex flex-row" : ""
            }`}>
              <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                <div className={`relative overflow-hidden ${
                  viewMode === "list" 
                    ? "w-48 flex-shrink-0" 
                    : "rounded-t-2xl"
                }`}>
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === "list" 
                        ? "w-full h-full rounded-l-2xl" 
                        : "w-full h-64"
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full">
                    <Heart className="w-4 h-4" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-primary text-white">
                    {dress.category}
                  </Badge>
                </div>
                
                <div className={`p-6 ${viewMode === "list" ? "flex-1 flex items-center" : ""}`}>
                  <div className={viewMode === "list" ? "flex justify-between items-center w-full" : ""}>
                    <div className={viewMode === "list" ? "flex-1" : ""}>
                      <h3 className="font-semibold text-lg mb-2">{dress.name}</h3>
                      <p className="text-2xl font-bold text-gradient mb-2">
                        ${dress.price}
                      </p>
                      
                      {viewMode === "list" && (
                        <p className="text-muted-foreground mb-4">{dress.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
                      
                      {viewMode === "grid" && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {dress.sizes.slice(0, 3).map((size) => (
                            <Badge key={size} variant="outline" className="text-xs">
                              {size}
                            </Badge>
                          ))}
                          {dress.sizes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{dress.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className={`${viewMode === "list" ? "flex flex-col space-y-2 ml-6" : "space-y-2"}`}>
                      <Link to={`/dress/${dress.id}`}>
                        <Button className="w-full btn-hero">
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Request This
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {sortedDresses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👗</div>
            <h3 className="text-2xl font-bold mb-2">No dresses found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedSize("");
                setSelectedColor("");
              }}
              className="btn-hero"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;