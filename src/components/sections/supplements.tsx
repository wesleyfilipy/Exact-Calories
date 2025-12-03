
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, PlusCircle, Lock, ImagePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

type Supplement = {
  id: string;
  name: string;
  link: string;
  imageUrl: string | null;
};

const initialSupplements: Supplement[] = [
  {
    id: 'supplement-whey',
    name: 'Whey Protein',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1693996045369-781799bbaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3aGV5JTIwcHJvdGVpbnxlbnwwfHx8fDE3NjQ3ODE1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'supplement-creatine',
    name: 'Creatine',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1693996045838-980674653385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjcmVhdGluZSUyMHN1cHBsZW1lbnR8ZW58MHx8fHwxNzY0NzgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'supplement-preworkout',
    name: 'Pre-Workout',
    link: '#',
    imageUrl: 'https://images.unsplash.com/photo-1704650311981-419f841421cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwcmUlMjB3b3Jrb3V0fGVufDB8fHx8MTc2NDc4MTU3MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const getSupplements = (): Supplement[] => {
    if (typeof window === 'undefined') {
        return initialSupplements;
    }
    const savedSupplements = localStorage.getItem('supplements');
    try {
        const parsed = savedSupplements ? JSON.parse(savedSupplements) : initialSupplements;
        if (Array.isArray(parsed)) {
            return parsed;
        }
    } catch (e) {
        console.error("Failed to parse supplements from localStorage", e);
    }
    return initialSupplements;
};

export default function SupplementsSection() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [newSupplementName, setNewSupplementName] = useState('');
  const [newSupplementLink, setNewSupplementLink] = useState('');
  const [newSupplementImage, setNewSupplementImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setSupplements(getSupplements());
  }, []);

  const persistSupplements = (newSupplements: Supplement[]) => {
    localStorage.setItem('supplements', JSON.stringify(newSupplements));
    setSupplements(newSupplements);
  };

  const handleAdminLogin = () => {
    if (password === '96966137') {
      setIsAdmin(true);
      setIsLoginDialogOpen(false);
      setPassword('');
      toast({
        title: 'Success',
        description: 'Admin mode activated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Incorrect password.',
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setNewSupplementImage(base64String);
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetAddDialog = () => {
    setNewSupplementName('');
    setNewSupplementLink('');
    setNewSupplementImage(null);
    setPreviewImage(null);
  }

  const handleAddSupplement = () => {
    if (newSupplementName && newSupplementLink) {
      const newSupp: Supplement = {
        id: `new-${Date.now()}`,
        name: newSupplementName,
        link: newSupplementLink,
        imageUrl: newSupplementImage,
      };
      const newSupplements = [...supplements, newSupp]
      persistSupplements(newSupplements);
      resetAddDialog();
      setIsAddDialogOpen(false);
      toast({
        title: 'Success',
        description: 'Supplement added.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please fill out the product name and affiliate link.',
      });
    }
  };

  const handleDeleteSupplement = (id: string) => {
    const updatedSupplements = supplements.filter((s) => s.id !== id);
    persistSupplements(updatedSupplements);
  };

  return (
    <section id="supplements" className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Recommended Supplements</h2>
          <p className="mt-4 text-muted-foreground">
            Boost your results with our curated selection of high-quality supplements.
          </p>
        </div>

        <div className="text-center mb-8">
            {isAdmin ? (
                <Dialog open={isAddDialogOpen} onOpenChange={(isOpen) => {
                  setIsAddDialogOpen(isOpen);
                  if (!isOpen) {
                    resetAddDialog();
                  }
                }}>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Supplement
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Supplement</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input
                                  id="name"
                                  value={newSupplementName}
                                  onChange={(e) => setNewSupplementName(e.target.value)}
                                  placeholder="e.g., Whey Protein"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="link">Affiliate Link</Label>
                                <Input
                                  id="link"
                                  value={newSupplementLink}
                                  onChange={(e) => setNewSupplementLink(e.target.value)}
                                  placeholder="https://example.com/product"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="image">Product Image</Label>
                                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="text-sm" />
                            </div>
                            {previewImage && (
                                <div className="flex justify-center">
                                    <Image src={previewImage} alt="Supplement preview" width={100} height={100} className="rounded-md object-cover" />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddSupplement}>Save Supplement</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            ) : (
                <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Lock className="mr-2 h-4 w-4" /> Admin Login
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Admin Access</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAdminLogin}>Login</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supplements.map((supplement) => (
            <Card key={supplement.id} className="group relative overflow-hidden flex flex-col">
                <a href={supplement.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                    <div className="relative w-full h-48">
                      {supplement.imageUrl ? (
                        <Image src={supplement.imageUrl} alt={supplement.name} fill style={{objectFit: 'cover'}} />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ImagePlus className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4 flex-grow flex flex-col justify-center items-center">
                        <CardTitle className="text-lg text-center">{supplement.name}</CardTitle>
                    </CardContent>
                </a>
              {isAdmin && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-80 hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the supplement.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteSupplement(supplement.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
