import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Upload, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AddDress = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    features: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    images: [] as string[],
  });

  const [newFeature, setNewFeature] = useState("");
  const [newColor, setNewColor] = useState("");

  const categories = [
    "Evening",
    "Casual",
    "Professional",
    "Party",
    "Classic",
    "Bohemian",
    "Vintage",
    "Modern",
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const commonColors = ["Black", "White", "Red", "Blue", "Pink", "Gray", "Navy", "Green", "Purple", "Yellow"];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayAdd = (field: string, value: string) => {
    if (value && !formData[field as keyof typeof formData].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...(formData[field as keyof typeof formData] as string[]), value],
      });
    }
  };

  const handleArrayRemove = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: (formData[field as keyof typeof formData] as string[]).filter((item) => item !== value),
    });
  };

  const handleSizeToggle = (size: string) => {
    if (formData.sizes.includes(size)) {
      handleArrayRemove("sizes", size);
    } else {
      handleArrayAdd("sizes", size);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dress data:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/admin" className="flex items-center space-x-2 text-primary hover:text-primary/80">
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Add New <span className="text-gradient">Dress</span>
          </h1>
          <p className="text-muted-foreground">
            Add a new dress to your collection with all the details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Dress Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Elegant Evening Gown"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="299"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="input-premium">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the dress, its features, and what makes it special..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="input-premium"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Images</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop images here, or click to browse
                  </p>
                  <Button type="button" variant="outline">
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended: 800x1000px, JPG or PNG, max 5MB each
                  </p>
                </div>

                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayRemove("images", image)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Features & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Key Features</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add a feature (e.g., Premium fabric blend)"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="input-premium flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newFeature.trim()) {
                          handleArrayAdd("features", newFeature.trim());
                          setNewFeature("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newFeature.trim()) {
                        handleArrayAdd("features", newFeature.trim());
                        setNewFeature("");
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleArrayRemove("features", feature)}
                        className="ml-2 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sizes and Colors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {availableSizes.map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={formData.sizes.includes(size) ? "default" : "outline"}
                      onClick={() => handleSizeToggle(size)}
                      className="h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Available Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {commonColors.map((color) => (
                    <Button
                      key={color}
                      type="button"
                      variant={formData.colors.includes(color) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (formData.colors.includes(color)) {
                          handleArrayRemove("colors", color);
                        } else {
                          handleArrayAdd("colors", color);
                        }
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Input
                    placeholder="Custom color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="input-premium flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newColor.trim()) {
                          handleArrayAdd("colors", newColor.trim());
                          setNewColor("");
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      if (newColor.trim()) {
                        handleArrayAdd("colors", newColor.trim());
                        setNewColor("");
                      }
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.colors.map((color, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer">
                      {color}
                      <button
                        type="button"
                        onClick={() => handleArrayRemove("colors", color)}
                        className="ml-2 hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Upload className="w-12 h-12 mx-auto mb-2" />
                    <p>Main image preview</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{formData.name || "Dress Name"}</h3>
                  <p className="text-2xl font-bold text-gradient">
                    ${formData.price || "0"}
                  </p>
                  <p className="text-muted-foreground">
                    {formData.description || "Dress description will appear here..."}
                  </p>
                  {formData.category && (
                    <Badge>{formData.category}</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/admin">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="btn-hero">
              Add Dress to Collection
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDress;