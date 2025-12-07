'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowLeft, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { createPrediction } from '@/lib/supabase/queries';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePredictionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    setLoading(true);
    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      await createPrediction({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        closes_at: date.toISOString(),
        tags,
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to create prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient font-space-grotesk">
                PredictStream
              </h1>
              <p className="text-sm text-muted-foreground">
                Next-Gen Prediction Markets
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-space-grotesk mb-2">
            Create New Prediction
          </h2>
          <p className="text-muted-foreground">
            Create a prediction market and let the community forecast the outcome
          </p>
        </div>

        <Card className="p-8 glass border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Prediction Question
              </Label>
              <Input
                id="title"
                placeholder="Will Tesla stock hit $300 by December?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="text-lg h-12"
              />
              <p className="text-sm text-muted-foreground">
                Make it clear and answerable with yes/no
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Provide context, criteria for resolution, and any important details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technology">💻 Technology</SelectItem>
                  <SelectItem value="Sports">⚽ Sports</SelectItem>
                  <SelectItem value="Entertainment">🎬 Entertainment</SelectItem>
                  <SelectItem value="Politics">🏛️ Politics</SelectItem>
                  <SelectItem value="Crypto">₿ Crypto</SelectItem>
                  <SelectItem value="Science">🔬 Science</SelectItem>
                  <SelectItem value="Finance">💰 Finance</SelectItem>
                  <SelectItem value="Other">📌 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Close Date */}
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                Resolution Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">
                When should this prediction be resolved?
              </p>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-semibold">
                Tags (Optional)
              </Label>
              <Input
                id="tags"
                placeholder="tesla, stocks, earnings (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Add tags to help people discover your prediction
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading || !formData.title || !formData.category || !date}
                className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {loading ? 'Creating...' : 'Create Prediction'}
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full h-12 text-base">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            💡 Tips for Great Predictions
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Make questions specific and measurable</li>
            <li>• Set clear resolution criteria in the description</li>
            <li>• Choose an appropriate timeframe - not too short or too long</li>
            <li>• Add relevant tags to increase discoverability</li>
            <li>• Be fair and objective in your predictions</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
